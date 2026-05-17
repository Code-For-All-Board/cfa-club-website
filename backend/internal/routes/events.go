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
	eventCacheInterval = 10 * time.Minute
	upcomingCachePath  = "cache/upcoming_events.json"
	pastCachePath      = "cache/past_events.json"
)

var eventCacheMu sync.RWMutex

func cachePath(eventType uint32) string {
	switch eventType {
	case scraper.Upcoming:
		return upcomingCachePath
	case scraper.Past:
		return pastCachePath
	default:
		return ""
	}
}

func refreshScrape(eventType uint32) error {
	events, err := scraper.ParseContent(eventType)
	if err != nil {
		return err
	}

	data, err := json.MarshalIndent(events, "", "  ")
	if err != nil {
		return err
	}

	path := cachePath(eventType)
	if path == "" {
		return os.ErrInvalid
	}

	if err := os.MkdirAll(filepath.Dir(path), 0755); err != nil {
		return err
	}

	eventCacheMu.Lock()
	defer eventCacheMu.Unlock()

	return os.WriteFile(path, data, 0644)
}

func RefreshEventCache() {
	if err := refreshScrape(scraper.Upcoming); err != nil {
		logger.Log(logger.Error, "failed to refresh upcoming events: ", err.Error())
	}

	if err := refreshScrape(scraper.Past); err != nil {
		logger.Log(logger.Error, "failed to refresh past events: ", err.Error())
	}
}

func StartEventCacheRefresher() {
	go func() {
		ticker := time.NewTicker(eventCacheInterval)
		defer ticker.Stop()

		for range ticker.C {
			RefreshEventCache()
		}
	}()
}

func readCachedEvents(eventType uint32) ([]scraper.Event, error) {
	path := cachePath(eventType)
	if path == "" {
		return []scraper.Event{}, os.ErrInvalid
	}

	eventCacheMu.RLock()
	data, err := os.ReadFile(path)
	eventCacheMu.RUnlock()

	if err != nil {
		return []scraper.Event{}, err
	}

	var events []scraper.Event
	if err := json.Unmarshal(data, &events); err != nil {
		return []scraper.Event{}, err
	}

	return events, nil
}

func writeEventsResponse(w http.ResponseWriter, events []scraper.Event) {
	w.Header().Set("Content-Type", "application/json")

	if events == nil {
		events = []scraper.Event{}
	}

	json.NewEncoder(w).Encode(events)
}

func handleCacheError(w http.ResponseWriter, err error) {
	logger.Log(logger.Error, err.Error())
	w.WriteHeader(http.StatusInternalServerError)
	w.Write([]byte("Internal Server Error"))
}

func GetPastEvents(w http.ResponseWriter, r *http.Request) {
	events, err := readCachedEvents(scraper.Past)

	if err != nil {
		handleCacheError(w, err)
		return
	}

	writeEventsResponse(w, events)
}

func GetUpcomingEvents(w http.ResponseWriter, r *http.Request) {
	events, err := readCachedEvents(scraper.Upcoming)

	if err != nil {
		handleCacheError(w, err)
		return
	}

	writeEventsResponse(w, events)
}
