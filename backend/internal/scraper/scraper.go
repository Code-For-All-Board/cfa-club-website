package scraper

import (
	"backend/internal/logger"

	"context"
	"regexp"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/chromedp/chromedp"
)

// LOL
const events_loaded_script = `
(() => {
	const container = document.querySelector('#divAllItems');
	if (!container) {
		return false;
	}

	return container.querySelector('li[id^="event_"]') !== null ||
		document.querySelector('#no_result_txt') !== null;
})()
`

func scrape(url string) (string, error) {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	ctx, cancel = context.WithTimeout(ctx, 20*time.Second)
	defer cancel()

	var html string
	var loaded bool

	err := chromedp.Run(ctx,
		chromedp.Navigate(url),
		chromedp.WaitReady(`#divAllItems`, chromedp.ByQuery),
		chromedp.Poll(events_loaded_script, &loaded, chromedp.WithPollingInterval(250*time.Millisecond)),
		chromedp.InnerHTML(`#divAllItems`, &html, chromedp.ByQuery),
	)

	if err != nil {
		logger.Log(logger.Error, err.Error())
		return "", err
	}

	return html, nil
}

func grab_date_time_location(description string) (string, string, string, bool) {
	var regex = regexp.MustCompile(
		`((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s+\d{1,2}\s+[A-Za-z]+\s+\d{4})\s+At\s+(\d{1,2}:\d{2}\s+[AP]M,\s+[A-Z]{2,4}\s+\(GMT[^\)]*\))\.\s*(.*?)\s*\.\s*Opens the event page\.`,
	)

	matches := regex.FindStringSubmatch(description)
	if matches == nil {
		return "", "", "", false
	}

	date := strings.TrimSpace(matches[1])
	time := strings.TrimSpace(matches[2])
	location := strings.TrimSpace(matches[3])

	if location == "Private Location ( sign in to display )" {
		location = "N/A"
	}

	return date, time, location, true
}

type Event struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Href        string   `json:"href"`
	Date        string   `json:"date"`
	Time        string   `json:"time"`
	Location    string   `json:"location"`
	ImageURL    string   `json:"image_url"`
	Tags        []string `json:"tags"`
	Description string   `json:"description"`
}

const (
	Upcoming uint32 = 0
	Past     uint32 = 1
)

func ParseContent(event_type uint32) ([]Event, error) {
	var html string
	var err error

	switch event_type {
	case Upcoming:
		html, err = scrape("https://uknighted.qc.cuny.edu/events?search_word=code+for+all")
	case Past:
		html, err = scrape("https://uknighted.qc.cuny.edu/events?search_word=code+for+all&show=past")
	}

	if err != nil {
		logger.Log(logger.Error, err.Error())
		return []Event{}, err
	}

	doc, err := goquery.NewDocumentFromReader(strings.NewReader(html))

	if err != nil {
		logger.Log(logger.Error, err.Error())
		return []Event{}, err
	}

	items := doc.Find(`li[id^="event_"]`)

	events := []Event{}

	items.Each(func(i int, s *goquery.Selection) {
		id, _ := s.Attr("id")

		link := s.Find("h3 a").First()
		if link.Size() == 0 {
			logger.Log(logger.Warn, "No link found for event with id: "+id)
			return
		}

		var tags []string

		s.Find(".rsvp__event-tags a").Each(func(i int, tag *goquery.Selection) {
			text := strings.TrimSpace(tag.Text())

			if text != "" {
				tags = append(tags, text)
			}
		})

		image_url, _ := s.Find(".listing-element__preimg-block img").First().Attr("src")
		title := strings.TrimSpace(link.Text())
		href, _ := link.Attr("href")
		aria_description, _ := link.Attr("aria-description")
		date, time, location, _ := grab_date_time_location(aria_description)

		events = append(events, Event{
			ID:          id,
			Title:       title,
			Href:        href,
			Date:        date,
			Time:        time,
			Location:    location,
			ImageURL:    image_url,
			Tags:        tags,
			Description: aria_description,
		})
	})

	return events, nil
}
