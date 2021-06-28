package core

// Represents an entire iconset
type Iconset struct {
	Icons []Icon
}

// Icon represents a single icon
type Icon struct {
	Name           string
	FigmaID        string
	Fingeprint     string
	Size           int
	Paths          []Path
	RelativeOffset Coordinate
}

type Path struct {
	Data string
	Rule string
}

type Coordinate struct {
	X string
	Y string
}
