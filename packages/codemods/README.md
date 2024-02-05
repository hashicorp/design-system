# codemods

A collection of codemods for Helios components.

## Usage

To run a specific codemod (for example the `v3/dropdown`) in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v3/dropdown path/to/some/glob/**/*.hbs
```

## Local usage

To run a specific codemod (for example the `v3/dropdown`) in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v3/dropdown path/to/some/glob/**/*.hbs
```

## Transforms

### v3
* [v3/dropdown](transforms/v3/dropdown/README.md)
* [v3/masked-input](transforms/v3/masked-input/README.md)
* [v3/radio-card](transforms/v3/radio-card/README.md)
* [v3/side-nav](transforms/v3/side-nav/README.md)

### v4
<!--TRANSFORMS_START-->
* [v3](transforms/v3/README.md)
* [v4](transforms/v4/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update documentation

* `yarn update-docs`
