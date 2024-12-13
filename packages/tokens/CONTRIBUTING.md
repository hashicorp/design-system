# How to contribute

## Initial setup

*Notice: [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/getting-started/install) needs to be installed on your local machine.*

* `git clone <repository-url>`
* `yarn install`
* `cd packages/tokens`

## Linting

* `yarn run lint`

## TypeChecking

* `yarn typecheck`

## Running the scripts

* `yarn build`

See below for more details about what these scripts do.

-----

# Updating the design tokens

The tool used to process the design tokens is [Style Dictionary](https://github.com/amzn/style-dictionary). It takes a set of JSON files in the `src` folder, process them applying specific filters and transformations, and generates in output a bunch of files in different formats (eg. CSS/Sass, JS, JSON) in the `dist` folder.

Style Dictionary is run via a custom `build` script (written in Node.js/TypeScript). In this script we generate dynamically a configuration object, pass it to Style Dictionary and then launch the `buildPlatform` command. This is done for both `products` and `marketing` (they have different designs, so also use different design tokens).

Whenever there is an update to the "foundations/components" in Figma (e.g. a new color is added), these changes need to be transfered also to the code. This means updating the design token names/values in a specific JSON file in the `src` folder, re-generate the tokens files in the output `dist` folder, and then releasing them as package to the npm registry, so that can be used by other tools and projects.

## Before you run the scripts

* Make sure you have done the initial setup of the project (see details above)
* Make sure your local `main` branch is up to date
* Create a custom branch from `main`.

## Build

The "build" step takes the "source" JSON files, process them, and generates in "output" a set of files that later will be published as npm package.
You can find the code that relates to this step in the file `/scripts/build.ts`.

To run this script use the following command in your CLI (while in the `packages/tokens` folder):

```bash
yarn build
```

This action will:

* Define a set of custom transformation methods
* Cleanup the `dist` folder
* For each of the target platforms (`products` and `marketing`):
  * initialize Style Dictionary with a custom configuration specific for that target
  * build the design tokens for the `web` platform
    * Style Dictionary this

## After you have run the scripts

* Check the git diff:
  * if you see only the `Generated on` value changed in the output files it means there are no updates in the tokens, so there's no need to commit the changes.
  * if there were changes to the tokens names or values, you will see changes in the JSON files in the `src` folder and in the generated files in the `dist` folder.
* Commit and push the changes, then submit a pull request in GitHub.
* Once approved and merged to the `main` branch, you can proceed to the release phase.

## Releasing a new npm version of the package

See the [release guide](https://hashicorp.atlassian.net/wiki/x/HIBT0Q) for details.
