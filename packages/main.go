package main

import (
	"flight/internal/core"
	"flight/internal/figma"
	"fmt"
	"log"
	"time"

	"github.com/joho/godotenv"
)

var (
	iconPath = "dist" // The folder to export `.svg`s to
)

func main() {
	log.Println("Taking flight...")

	// Load a .env file, for local development
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	icons := figma.FindIconsInDoc()

	for _, i := range icons {
		// For each icon, request an export from Figma
		url, err := figma.ExportIconToURL(i)

		if err != nil {
			log.Fatal(err)
		} else {
			// If the export is successful, asynchronously download the given URL
			go core.DownloadFile(url, fmt.Sprintf("./%s/%s.svg", iconPath, i.Name))
		}

		// Sleep for one second so we don't hit the Figma API too rapidly
		time.Sleep(1 * time.Second)
	}
}
