# codemods

A collection of codemods for Helios components.

## Usage

To run a specific codemod (for example the `v3/dropdown`) in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v3/dropdown path/to/some/glob/**/*.hbs
```

## Local usage

To run a specific codemod (for example the `v3/dropdown`) in this repository (even before publishing it), you would run the following:

```bash
node ./bin/cli.js v3/dropdown path/to/some/glob/**/*.hbs
```

## Transforms

<!--TRANSFORMS_START-->
* [v3/dropdown](transforms/v3/dropdown/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`
