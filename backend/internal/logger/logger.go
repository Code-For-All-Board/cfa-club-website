package logger

import (
	"fmt"
)

type State int32

const (
	Success State = 0
	Info    State = 1
	Warn    State = 2
	Error   State = 3
)

func Log(state State, messages ...string) {
	var result string

	switch state {
	case Success:
		result += "[SUCCESS] "
	case Warn:
		result += "[WARN] "
	case Error:
		result += "[ERROR] "
	case Info:
		result += "[INFO] "
	}

	for _, message := range messages {
		result = result + message
	}

	fmt.Println(result)
}
