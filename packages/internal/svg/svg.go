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

func CreateSvgFromIcon(icon core.Icon, fileName string) error {
	viewbox := "0 0 " + strconv.Itoa(icon.Size) + " " + strconv.Itoa(icon.Size)
	offset := "translate(" + icon.RelativeOffset.X + ", " + icon.RelativeOffset.Y + ")"

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

func writeSvgToFile(svg svg, fileName string) error {
	// Output the marshalled struct
	file, _ := xml.MarshalIndent(svg, "", " ")
	err := ioutil.WriteFile(fileName, file, 0644)

	if err != nil {
		return errors.New("couldn't create file on disk")
	}

	return nil
}
