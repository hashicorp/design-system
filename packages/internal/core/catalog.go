package core

import (
	"encoding/json"
	"io/ioutil"
)

// Takes an array of `Icon` and creates a json catalog in the dist directory
func CreateCatalogFile(icons []Icon, fileName string) {
	var newIconset []Icon

	// We don't want all the data output to the catalog so lets recreate our Icon array
	for _, i := range icons {
		icon := Icon{Name: i.Name, Size: i.Size}
		newIconset = append(newIconset, icon)
	}

	// Marshall to json and write to disk
	file, _ := json.Marshal(newIconset)
	ioutil.WriteFile(fileName, file, 0644)
}
