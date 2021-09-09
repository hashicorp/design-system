# flight-build

A prototypical pipeline for building the Flight iconset into a repository that can be consumed by other tooling

---

## Usage

flight-build runs entirely on GitHub actions. Triggering the `build_iconset` action will;

* Pull the latest icons from the Flight figma document
* Save them as `.svg` files into `./dist`
* Auto-commit the changes

## Development

flight-build requires Go to be installed locally but has no other dependants.

```bash
git clone https://github.com/hashicorp/flight
cd export-go
go run .
```

### Local Development

To run locally, follow these 3 steps.

First, clone this repository:

```bash
git clone https://github.com/hashicorp/flight
```

Next, add a `.env` file to the root of the `export-go` directory, to which you will add two variables:

`FIGMA_TOKEN=###`
`FLIGHT_FILE_ID=###`

Where `###` for `FIGMA_TOKEN` is your personal access token. To receive your personal access token, go into Figma > Account > Personal access tokens and create one for yourself.

`###` for `FLIGHT_FILE_ID` is the file id for the icon file in Figma. To find this open the file for Flight in Figma and look for the file id in the URL: `https://www.figma.com/file/<file-id>/`.

The `.env` file is ignored by git, and should not be committed to the repository.

Finally, run the build command:

```bash
go run .
```

## Building

Run the GitHub action `flight_compile` to create a new binary which will be committed to this repo. Please do not commit locally created builds.
