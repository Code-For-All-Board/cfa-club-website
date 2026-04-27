package main

import (
	"backend/internal/logger"
	//"backend/internal/scraper"
	"backend/internal/routes"

	"net/http"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Write(([]byte("OK")))
	})

	mux.HandleFunc("GET /upcoming-events", routes.GetUpcomingEvents)

	logger.Log(logger.Info, "route created")

	err := http.ListenAndServe(":8080", mux)
	if err != nil {
		logger.Log(logger.Error, err.Error())
	}
}
