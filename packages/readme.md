# flight-build

### A prototypical pipeline for building the Flight iconset into a repository that can be consumed by other tooling

---

## Usage

flight-build runs entirely on GitHub actions. Triggering the `build_iconset` action will;

* Pull the latest icons from the Flight figma document
* Save them as `.svg` files into `./dist`
* Auto-commit the changes

## Development

flight-build requires Go to be installed locally but has no other dependants.

```bash
git clone <this-repository>
go run .
```

## Building

Run the GitHub action `flight_compile` to create a new binary which will be committed to this repo. Please do not commit locally created builds.