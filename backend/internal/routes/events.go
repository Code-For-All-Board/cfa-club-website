package routes

import (
	"backend/internal/logger"
	"backend/internal/scraper"
	"bytes"
	"encoding/json"
	"hash/crc32"
	"net/http"
	"os"
)

var previous_checksum uint32
var has_checksum bool

/*
"we don't tolerate any nonsense here!"
the humble hash checker:
*/
func hash_checker(bytes []byte) uint32 {
	crc32q := crc32.MakeTable(0xC0FFEE)
	return crc32.Checksum(bytes, crc32q)
}

func load_previous_checksum() bool {
	data, err := os.ReadFile("events.json")
	if err != nil {
		return false
	}

	data = bytes.TrimSpace(data)
	if len(data) == 0 {
		return false
	}

	if data[0] != '[' {
		previous_checksum = hash_checker(data)
		has_checksum = true
		return true
	}

	var events []json.RawMessage
	if err := json.Unmarshal(data, &events); err != nil || len(events) == 0 {
		return false
	}

	previous_checksum = hash_checker(events[len(events)-1])
	has_checksum = true
	return true
}

func append_events(data []byte) error {
	existing, err := os.ReadFile("events.json")
	if os.IsNotExist(err) || len(bytes.TrimSpace(existing)) == 0 {
		return os.WriteFile("events.json", append([]byte("[\n"), append(data, []byte("\n]\n")...)...), 0644)
	}
	if err != nil {
		return err
	}

	trimmed := bytes.TrimSpace(existing)
	if trimmed[0] != '[' {
		next := append([]byte("[\n"), trimmed...)
		next = append(next, []byte(",\n")...)
		next = append(next, data...)
		next = append(next, []byte("\n]\n")...)
		return os.WriteFile("events.json", next, 0644)
	}

	file, err := os.OpenFile("events.json", os.O_RDWR, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	end := int64(len(existing))
	for end > 0 {
		if !bytes.ContainsAny(existing[end-1:end], " \n\r\t") {
			break
		}
		end--
	}

	if end == 0 || existing[end-1] != ']' {
		return os.WriteFile("events.json", append([]byte("[\n"), append(data, []byte("\n]\n")...)...), 0644)
	}

	prefix := bytes.TrimSpace(existing[:end-1])
	separator := []byte("\n")
	if len(prefix) > 1 {
		separator = []byte(",\n")
	}

	if err := file.Truncate(end - 1); err != nil {
		return err
	}
	if _, err := file.Seek(end-1, 0); err != nil {
		return err
	}

	_, err = file.Write(append(separator, append(data, []byte("\n]\n")...)...))
	return err
}

func store_events(data []byte) {
	current_checksum := hash_checker(data)
	if !has_checksum {
		load_previous_checksum()
	}

	if has_checksum && previous_checksum == current_checksum {
		logger.Log(logger.Info, "events unchanged; skipping file write")
		return
	}

	if err := append_events(data); err != nil {
		logger.Log(logger.Error, err.Error())
		return
	}

	previous_checksum = current_checksum
	has_checksum = true
	logger.Log(logger.Info, "events changed; appended events.json")
}

func GetUpcomingEvents(w http.ResponseWriter, r *http.Request) {
	event, err := scraper.ParseContent()

	if err != nil {
		logger.Log(logger.Error, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal Server Error"))
		return
	}

	json_bytes, err := json.Marshal(event)
	if err != nil {
		logger.Log(logger.Error, err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal Server Error"))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(json_bytes)
	store_events(json_bytes)
}
