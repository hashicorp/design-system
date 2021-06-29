package core

import (
	"encoding/json"
	"io/ioutil"
)

// Takes an array of `Icon` and creates a json catalog in the dist directory
func CreateCatalogFile(icons []Icon, fileName string) {
	var newIconset []Icon

	for _, i := range icons {
		icon := Icon{Name: i.Name, Size: i.Size}
		newIconset = append(newIconset, icon)
	}

	file, _ := json.Marshal(newIconset)
	ioutil.WriteFile(fileName, file, 0644)
}
