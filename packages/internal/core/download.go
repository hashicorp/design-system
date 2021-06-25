package core

import (
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

// Downloads an image from a given `URL` and creates a file at a given `filename`
func DownloadFile(URL, fileName string) error {
	log.Println(fmt.Sprintf("Downloading %s", URL))

	response, err := http.Get(URL)

	if err != nil {
		return err
	}

	defer response.Body.Close()

	if response.StatusCode != 200 {
		return errors.New("received non 200 response code")
	}

	file, err := os.Create(fileName)
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = io.Copy(file, response.Body)
	if err != nil {
		return err
	}

	return nil
}
