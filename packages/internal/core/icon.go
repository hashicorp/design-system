package core

// Represents an entire iconset
type Iconset struct {
	Icons []Icon
}

// Icon represents a single icon
type Icon struct {
	Name       string
	FigmaID    string
	Fingeprint string
	Size       int
	// TODO: Add json struct types
}
