# UKnighted API

UKnighted doesn't typically expose an API to gather data on the events hosted at Queens College, so I decided to scrape the website and make an API over it.

## First-Time Setup

### Prerequisites

- Go installed with the version from `go.mod`
- Google Chrome installed for `chromedp`

Check your Go version:

```sh
go version
```

Install dependencies:

```sh
go mod download
```

## Running Locally

From the project root, start the API from the backend directory:

```sh
cd backend
go run ./cmd/api
```

The server starts on `http://localhost:8080`.

## Available Routes

```txt
GET /health
GET /upcoming-events
GET /past-events
```

Examples:

```sh
curl http://localhost:8080/upcoming-events
curl http://localhost:8080/past-events
```

## Cache Files

The app stores scraped event data in:

```txt
cache/upcoming_events.json
cache/past_events.json
```

The cache refreshes when the app starts and then refreshes every 10 minutes.
