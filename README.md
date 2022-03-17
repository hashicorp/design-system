# HashiCorp Design System

## Workspaces

This monorepo uses [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) to manage dependencies for all packages. New packages should be added directly to the relevant workspace's `package.json` file (such as `design-system/packages/flight-icons`) and then run `yarn` in the workspace root (`design-system`).

Note: package folders such as `packages/flight-icons` should not contain a `yarn.lock` file. If one is accidentally created, please remove it and ensure you run `yarn` from the root of the monorepo.

## Changesets

This project uses [changesets](https://github.com/changesets/changesets) to manage how changes will be released. Each change to a package - i.e. every PR - should come with a changeset for each package that has changed.

To create a changeset, run and follow the prompts in your terminal:

```bash
yarn changeset
```

See the [changeset docs](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) for more information.

Note: If you want to ignore a changestep bump in terminal (e.g. major bump for selected "package x" is N/A, want a patch release), press return on the command line to skip that step.

## Releasing

Release PRs are created and automatically updated on every PR merge by the [changeset GitHub action](https://github.com/changesets/action). Once we are ready to do a release, the PR – titled `Version Packages` – can be merged to `main` and the changes will be released to NPM automatically.

### Local Testing of Versioning

You can simulate the versioning experience locally with this command:

```bash
yarn changeset version
```

In order for this step to complete successfully you'll need to create a personal access token [in GitHub](https://github.com/settings/tokens). The name could be anything e.g. `design-system`, with `read:user` and `repo:status` scopes, and then add the token to a `.env` file in the project's root.

```
GITHUB_TOKEN=YOUR-TOKEN-HERE
```

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

See [flight-icons/CONTRIBUTING](packages/flight-icons/CONTRIBUTING.md) guide for details on how to use the "sync/build" scripts, that export the assets from Figma and generate a bundle of standalone SVG files.

#### @hashicorp/ember-flight-icons

See [ember-flight-icons/CONTRIBUTING](packages/ember-flight-icons/CONTRIBUTING.md) guide for details on how to build and test the Ember addon.

## @hashicorp/design-system-tokens

| Package                                                                              | Version                                                                                                                         |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **[@hashicorp/design-system-tokens](./packages/tokens/)** <br />Design tokens    | [![npm version](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-tokens.svg)](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-tokens) |

### Contributing

See [tokens/CONTRIBUTING](packages/tokens/CONTRIBUTING.md) guide for details on how to update the design tokens.

## @hashicorp/design-system-components

| Package                                                                              | Version                                                                                                                         |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **[@hashicorp/design-system-components](./packages/components/)** <br />Design System components    | [![npm version](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-components.svg)](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-components) |

### Contributing

See [components/CONTRIBUTING](packages/components/CONTRIBUTING.md) guide for details on how to update the components.

## License

This project is licensed under the [Mozilla Public License 2.0](LICENSE.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning.
