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
func DownloadToFile(URL, fileName string) error {
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
		log.Fatal("Could not create file on disk. Check folder permissions")
		return err
	}

	log.Println(fmt.Sprintf("Created file at %s", fileName))

	defer file.Close()

	_, err = io.Copy(file, response.Body)
	if err != nil {
		log.Fatal("Could not copy icon from memory to disk")
		return err
	}

	return nil
}
