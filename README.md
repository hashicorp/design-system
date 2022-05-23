# HashiCorp Design System

## Packages

### `packages/components`

Design System components in Ember.js

- NPM package: **@hashicorp/design-system-components** - [![npm version](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-components.svg)](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-components)
- website: [design-system-components-hashicorp.vercel.app](https://design-system-components-hashicorp.vercel.app) 
- more info: see [components/README](packages/components/CONTRIBUTING.md) and [components/CONTRIBUTING](packages/components/CONTRIBUTING.md) for more info.

### `packages/ember-flight-icons`

Ember.js addon with `<FlightIcon />` component

- NPM package: **@hashicorp/ember-flight-icons** - [![npm version](https://badge.fury.io/js/%40hashicorp%2Fember-flight-icons.svg)](https://badge.fury.io/js/%40hashicorp%2Fember-flight-icons)
- website: [flight-hashicorp.vercel.app](https://flight-hashicorp.vercel.app/)
- more info: see [ember-flight-icons/README](packages/ember-flight-icons/README.md) and [ember-flight-icons/CONTRIBUTING](packages/ember-flight-icons/CONTRIBUTING.md) for details on how to build and test the Ember addon.

### `packages/flight-icons`

Flight icons in different formats (SVG/SVG Sprite/React)

- NPM package: `@hashicorp/flight-icons` - [![npm version](https://badge.fury.io/js/%40hashicorp%2Fflight-icons.svg)](https://badge.fury.io/js/%40hashicorp%2Fflight-icons)
- website: [flight-hashicorp.vercel.app](https://flight-hashicorp.vercel.app/)
- more info: see [flight-icons/README](packages/flight-icons/README.md) and [flight-icons/CONTRIBUTING](packages/flight-icons/CONTRIBUTING.md) for details on how to use the "sync/build" scripts, that export the assets from Figma and generate a bundle of standalone SVG files.

### `packages/flight-website`

The dedicated `flight-icons` website (it has its own Yarn workspace).

- website: [flight-hashicorp.vercel.app](https://flight-hashicorp.vercel.app/)

### `packages/tokens`

Design tokens

- NPM package: **@hashicorp/design-system-tokens** - [![npm version](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-tokens.svg)](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-tokens)
- website: [design-system-components-hashicorp.vercel.app/foundations/tokens](https://design-system-components-hashicorp.vercel.app/foundations/tokens)
- more info: see [tokens/README](packages/tokens/README.md) and [tokens/CONTRIBUTING](packages/tokens/CONTRIBUTING.md) for details on how to update the design tokens.

## Using ember install in the monorepo

Run this command from the monorepo root:

```bash
yarn workspace <workspace-npm-package> run ember install <npm-package>
```

e.g. `yarn workspace @hashicorp/design-system-components run ember install ember-a11y-refocus`

🚨 Note: Since we use Yarn 1, this command will install a `yarn.lock` at `packages/components`. Please manually delete that file!

## Contributing

### Workspaces

This monorepo uses [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) to manage dependencies for all packages. New packages should be added directly to the relevant workspace's `package.json` file (such as `design-system/packages/flight-icons`) and then run `yarn` in the workspace root (`design-system`).

Note: package folders such as `packages/flight-icons` should not contain a `yarn.lock` file. If one is accidentally created, please remove it and ensure you run `yarn` from the root of the monorepo.

### Changesets

This project uses [changesets](https://github.com/changesets/changesets) to manage how changes will be released. Each user-facing change to a package should come with a changeset for each package that has changed.

To create a changeset, run and follow the prompts in your terminal:

```bash
yarn changeset
```

See the [changeset docs](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) for more information.

Note: If you want to ignore a changestep bump in terminal (e.g. major bump for selected "package x" is N/A, want a patch release), press return on the command line to skip that step. Press the space bar to select that step.

### Releasing

Release PRs are created and automatically updated on every PR merge by the [changeset GitHub action](https://github.com/changesets/action). Once we are ready to do a release, the PR – titled `Version Packages` – can be approved and merged to `main`, and the changes will be released to NPM automatically.

#### Local testing of versioning

You can simulate the versioning experience locally with this command:

```bash
yarn changeset version
```

In order for this step to complete successfully you'll need to create a personal access token [in GitHub](https://github.com/settings/tokens). The name could be anything e.g. `design-system`, with `read:user` and `repo:status` scopes, and then add the token to a `.env` file in the project's root.

```bash
GITHUB_TOKEN=YOUR-TOKEN-HERE
```

## License

This project is licensed under the [Mozilla Public License 2.0](LICENSE).

## Versioning

We use [SemVer](http://semver.org/) for versioning.
