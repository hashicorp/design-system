package svg

import (
	"encoding/xml"
	"errors"
	"flight/internal/core"
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
)

const (
	schema = "http://www.w3.org/2000/svg"
)

type svg struct {
	Viewbox   string `xml:"viewbox,attr"`
	Width     string `xml:"width,attr"`
	Height    string `xml:"height,attr"`
	Fill      string `xml:"fill,attr"`
	Namespace string `xml:"xmlns,attr"`
	Group     group  `xml:"g"`
}

type group struct {
	Translate string `xml:"transform,attr"`
	Paths     []path
}

type path struct {
	XMLName  xml.Name `xml:"path"`
	Data     string   `xml:"d,attr"`
	FillRule string   `xml:"fill-rule,attr"`
}

// Creates a .svg file on disk from an `Icon`
func CreateSvgFromIcon(icon core.Icon, fileName string) error {
	viewbox := fmt.Sprintf("0 0 %d %d", icon.Size, icon.Size)
	offset := fmt.Sprintf("translate(%s, %s)", icon.RelativeOffset.X, icon.RelativeOffset.Y)

	svg := svg{
		Viewbox:   viewbox,
		Width:     strconv.Itoa(icon.Size),
		Height:    strconv.Itoa(icon.Size),
		Fill:      "black",
		Namespace: schema,
		Group:     group{Translate: offset},
	}

	for _, p := range icon.Paths {
		svg.Group.Paths = append(svg.Group.Paths, path{Data: p.Data, FillRule: p.Rule})
	}

	log.Println(fmt.Sprintf("Writing file %s", fileName))

	writeSvgToFile(svg, fileName)

	return nil
}

// Output the marshalled struct to a file
func writeSvgToFile(svg svg, fileName string) error {
	file, _ := xml.MarshalIndent(svg, "", " ")
	err := ioutil.WriteFile(fileName, file, 0644)

	if err != nil {
		return errors.New("couldn't create file on disk")
	}

	return nil
}
