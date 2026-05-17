package scraper

import (
	"backend/internal/logger"

	"context"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/chromedp/chromedp"
)

// LOL
const eventsLoadedScript = `
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
		chromedp.Poll(eventsLoadedScript, &loaded, chromedp.WithPollingInterval(250*time.Millisecond)),
		chromedp.InnerHTML(`#divAllItems`, &html, chromedp.ByQuery),
	)

	if err != nil {
		logger.Log(logger.Error, err.Error())
		return "", err
	}

	return html, nil
}

func grabDateTimeLocation(description string) (string, string, string, bool) {
	var regex = regexp.MustCompile(
		`((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s+\d{1,2}\s+[A-Za-z]+\s+\d{4})\s+At\s+(\d{1,2}:\d{2}\s+[AP]M,\s+[A-Z]{2,4}\s+\(GMT[^\)]*\))\.\s*(.*?)\s*\.\s*Opens the event page\.`,
	)

	matches := regex.FindStringSubmatch(description)
	if matches == nil {
		return "", "", "", false
	}

	date := strings.TrimSpace(matches[1])
	eventTime := strings.TrimSpace(matches[2])
	location := strings.TrimSpace(matches[3])

	if location == "Private Location ( sign in to display )" {
		location = "N/A"
	}

	return date, eventTime, location, true
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

func ParseContent(eventType uint32) ([]Event, error) {
	var html string
	var err error

	switch eventType {
	case Upcoming:
		html, err = scrape("https://uknighted.qc.cuny.edu/events?search_word=code+for+all")
	case Past:
		html, err = scrape("https://uknighted.qc.cuny.edu/events?search_word=code+for+all&show=past")
	default:
		return nil, fmt.Errorf("invalid event type: %d", eventType)
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

		imageURL, _ := s.Find(".listing-element__preimg-block img").First().Attr("src")
		title := strings.TrimSpace(link.Text())
		href, _ := link.Attr("href")
		ariaDescription, _ := link.Attr("aria-description")
		date, eventTime, location, _ := grabDateTimeLocation(ariaDescription)

		events = append(events, Event{
			ID:          id,
			Title:       title,
			Href:        href,
			Date:        date,
			Time:        eventTime,
			Location:    location,
			ImageURL:    imageURL,
			Tags:        tags,
			Description: ariaDescription,
		})
	})

	return events, nil
}
