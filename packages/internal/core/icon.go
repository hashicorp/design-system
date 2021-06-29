package core

// Represents an entire iconset
type Iconset struct {
	Icons []Icon
}

// Icon represents a single icon
type Icon struct {
	Name           string
	FigmaID        string     `json:",omitempty"`
	Fingeprint     string     `json:",omitempty"`
	Size           int        `json:",omitempty"`
	Paths          []Path     `json:"-"`
	RelativeOffset Coordinate `json:"-"`
}

type Path struct {
	Data string
	Rule string
}

type Coordinate struct {
	X string
	Y string
}
