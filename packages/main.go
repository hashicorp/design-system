package main

import (
	"flight/internal/core"
	"flight/internal/figma"
	"flight/internal/svg"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	flightVersion = "development"
)

const (
	iconPath = "dist" // The folder to export `.svg`s to
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

	for _, icon := range icons {
		// Create the svg from the icon and write to disk
		svg.CreateSvgFromIcon(icon, fmt.Sprintf("./%s/%s.svg", iconPath, icon.Name))
	}

	// Create the catalog file
	core.CreateCatalogFile(icons, fmt.Sprintf("./%s/_catalog.json", iconPath))
}
