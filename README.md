# HashiCorp Design System

## Workspaces

This monorepo uses [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) to manage dependencies for all packages. New packages should be added directly to the relevant workspace's `package.json` file (such as `design-system/packages/flight-icons`) and then run `yarn` in the workspace root (`design-system`).

Note: package folders such as `packages/flight-icons` should not contain a `yarn.lock` file. If one is accidentally created, please remove it and ensure you run `yarn` from the root of the monorepo.

## Flight Icons

| Package                                                                              | Version                                                                                                                         |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **[@hashicorp/flight-icons](./packages/flight-icons/)** <br />Flight Icon svgs    | [![npm version](https://badge.fury.io/js/%40hashicorp%2Fflight-icons.svg)](https://badge.fury.io/js/%40hashicorp%2Fflight-icons) |
| **[@hashicorp/ember-flight-icons](./packages/ember-flight-icons/)** <br />Ember.js addon with `<FlightIcon />` component | [![npm version](https://badge.fury.io/js/%40hashicorp%2Fember-flight-icons.svg)](https://badge.fury.io/js/%40hashicorp%2Fember-flight-icons)   

### Installation and Usage Instructions

The micro-site for this project is [https://flight-hashicorp.vercel.app](https://flight-hashicorp.vercel.app)

Instructions for installation and use are available, as well as a searchable list of available icons and the documentation for designers and developers.      

### Contributing

#### @hashicorp/flight-icons

See [flight-icons/CONTRIBUTING](packages/flight-icons/CONTRIBUTING.md) guide for details on how to use the "sync/build/release" scripts, that export the assets from Figma and generate a bundle of standalone SVG files.

#### @hashicorp/ember-flight-icons

See [ember-flight-icons/CONTRIBUTING](packages/ember-flight-icons/CONTRIBUTING.md) guide for details on how to build, test and release the Ember addon.

### Releasing

See the [RELEASE](RELEASE.md) guide for details.

## License

This project is licensed under the [Mozilla Public License 2.0](LICENSE.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning.
