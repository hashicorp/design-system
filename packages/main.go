package main

import (
	"flight/internal/core"
	"flight/internal/figma"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
)

var (
	flightVersion = "development"
)

const (
	iconPath          = "dist" // The folder to export `.svg`s to
	requestsPerMinute = 17     // Amount of requests to Figma to allow per minute
	waitPeriod        = 45     // Wait period in seconds between batch requests
)

func main() {
	log.Println(fmt.Sprintf("Taking flight (%s)", flightVersion))

	// Create the icon distribution folder if it doesn't exist already
	if _, err := os.Stat(fmt.Sprintf("./%s", iconPath)); os.IsNotExist(err) {
		os.Mkdir(fmt.Sprintf("./%s", iconPath), 0755)
	}

	// Load a .env file, for local development
	godotenv.Load()

	// Fill an array with all the icons from our Figma doc
	icons, err := figma.FindIconsInDoc()

	if err != nil {
		log.Fatal("Error getting icons from Figma document")
	}

	for count, icon := range icons {
		// TODO: Diff icons on disk and Figma to see which ones we should update

		println("Fingerprint:")
		println(icon.Fingeprint)

		// For each icon, request an export from Figma
		url, err := figma.ExportIconToURL(icon)

		if err != nil {
			// If something goes wrong while exporting with Figma, log the error and exit
			log.Fatal(err)
		} else {
			// If the export is successful, asynchronously download the URL Figma has given us
			go core.DownloadToFile(url, fmt.Sprintf("./%s/%s.svg", iconPath, icon.Name))
		}

		// Sleep for 45 seconds every X requests so we don't hit Figma's rate limiting
		if count%requestsPerMinute == 0 && count != 0 {
			log.Println(fmt.Sprintf("Waiting for %d seconds...", waitPeriod))
			time.Sleep(waitPeriod * time.Second)
		}
	}
}
