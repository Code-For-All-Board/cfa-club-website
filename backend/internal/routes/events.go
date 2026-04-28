package routes

import (
	"backend/internal/logger"
	"backend/internal/scraper"
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"sync"
	"time"
)

const (
	event_cache_interval = 10 * time.Minute
	upcoming_cache_path  = "cache/upcoming_events.json"
	past_cache_path      = "cache/past_events.json"
)

var event_cache_mu sync.RWMutex

func cache_path(eventType uint32) string {
	switch eventType {
	case scraper.Upcoming:
		return upcoming_cache_path
	case scraper.Past:
		return past_cache_path
	default:
		return ""
	}
}

func refresh_scrape(eventType uint32) error {
	events, err := scraper.ParseContent(eventType)
	if err != nil {
		return err
	}

	data, err := json.MarshalIndent(events, "", "  ")
	if err != nil {
		return err
	}

	path := cache_path(eventType)
	if path == "" {
		return os.ErrInvalid
	}

	if err := os.MkdirAll(filepath.Dir(path), 0755); err != nil {
		return err
	}

	event_cache_mu.Lock()
	defer event_cache_mu.Unlock()

	return os.WriteFile(path, data, 0644)
}

func RefreshEventCache() {
	if err := refresh_scrape(scraper.Upcoming); err != nil {
		logger.Log(logger.Error, "failed to refresh upcoming events: ", err.Error())
	}

	if err := refresh_scrape(scraper.Past); err != nil {
		logger.Log(logger.Error, "failed to refresh past events: ", err.Error())
	}
}

func StartEventCacheRefresher() {
	go func() {
		ticker := time.NewTicker(event_cache_interval)
		defer ticker.Stop()

		for range ticker.C {
			RefreshEventCache()
		}
	}()
}

func read_cached_events(eventType uint32) ([]scraper.Event, error) {
	path := cache_path(eventType)
	if path == "" {
		return []scraper.Event{}, os.ErrInvalid
	}

	event_cache_mu.RLock()
	data, err := os.ReadFile(path)
	event_cache_mu.RUnlock()

	if err != nil {
		return []scraper.Event{}, err
	}

	var events []scraper.Event
	if err := json.Unmarshal(data, &events); err != nil {
		return []scraper.Event{}, err
	}

	return events, nil
}

func write_events_response(w http.ResponseWriter, events []scraper.Event, emptyMessage string) {
	w.Header().Set("Content-Type", "application/json")

	if len(events) == 0 {
		json.NewEncoder(w).Encode(map[string]string{
			"message": emptyMessage,
		})
		return
	}

	json.NewEncoder(w).Encode(events)
}

func handle_cache_error(w http.ResponseWriter, err error) {
	logger.Log(logger.Error, err.Error())
	w.WriteHeader(http.StatusInternalServerError)
	w.Write([]byte("Internal Server Error"))
}

func GetPastEvents(w http.ResponseWriter, r *http.Request) {
	events, err := read_cached_events(scraper.Past)

	if err != nil {
		handle_cache_error(w, err)
		return
	}

	write_events_response(w, events, "No past events")
}

func GetUpcomingEvents(w http.ResponseWriter, r *http.Request) {
	events, err := read_cached_events(scraper.Upcoming)

	if err != nil {
		handle_cache_error(w, err)
		return
	}

	write_events_response(w, events, "No upcoming events")
}
