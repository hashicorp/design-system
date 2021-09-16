# Flight-Icons "sync/build/release" scripts

A set of Node.js scripts developed to create a single pipeline for building and releasing the Flight iconset as a set of packages in different formats, that can be consumed by other tools and products.

The pipeline can be run manually, on your local machine, or via GitHub actions.

-----

## Releasing a new npm version of the package

Whenever there is an update to the Flight Icons library in Figma (eg. a new icon is added), these changes need to be transfered also to the code. This means re-syncing and re-building the `flight-icons` package and then release it to the npm registry.

_Remember: once released a package on the public registry, you can't revert the changes: the only solution is to deprecate the package (this will hide it from the public, but remains there)._

The update process for the icons should happen in a dedicated branch, associated with the GitHub task/issue. Once you have run the `yarn sync` and `yarn build` (see the instructions below), check the diff in your git client, and once you're OK with them commit the changes to the branch, push and then ask for a pull request.

Once this request has been approved and the branch merged in `main`, you can publish the package (using directly the `main` branch, no need to create a new PR for this) using the `release` command (see the instructions below).


## Initial setup


*Notice: [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/getting-started/install) needs to be installed on your local machine.*

First of all clone the repository:

```bash
git clone https://github.com/hashicorp/flight
```

Then install the project dependencies:

```bash
# go to the "main" folder
cd /[your-local-project-path]/flight-icons

# install node modules
yarn install
```

#### Figma Token

To access the Figma file via REST API is necessary to have [a special authentication token](https://www.figma.com/developers/api#access-tokens). This token is personal, should not be shared or committed to the repo.

To create your personal access token, open Figma and go into *Account > Personal access tokens* and create one for yourself.

Next, add a `.env` file in the `scripts` directory, to which you will add the variable:

`FIGMA_TOKEN=###`

where `###` is your personal access token. You can use the `.env.template` file you find in the repository as model, if you want.

**IMPORTANT**: the `.env` file is ignored by git, and should not be committed to the repository.


Once you've done the initial setup, there are three distinct steps in the process that you can follow.

## Sync

The synchronization step is executed by the `/scripts/sync.ts` file. To run this script launch the following commands in your CLI (while in the `flight-icons` folder):

```bash
yarn sync
```

This action will:

* Retrieve the assets metadata from Figma via REST API
* Export the assets as `.svg` files into `./svg-original/`
* Generate the `catalog.json` file

## Build

The build step is executed by the `/scripts/build.ts` file. To run this script use the following command in your CLI (while in the `flight-icons` folder):

```bash
yarn build
```

This action will:

* Optimize the SVG files and save then in a `temp` folder
* Process the optimized SVG files and save then in the `svg` folder
* Update the existing files in the Ember addon folder:
    * Process the optimized SVG, generate a SVG sprite, and overwrite the existing sprite
    * Overwrite the catalog.json with the new one

## Release

The release step is executed using a set of NPM scripts defined in the `package.json` file. Use the following command in your CLI (while in the `flight-icons` folder):


```bash
yarn release
```

This action will:

* ask (interactively*) the user which _semver_ version they want to to use
	* the `bump` command will interactively ask you which semver version you want to use: you can move up and down with the keyboard, choose one option, and then hit "enter".
* update the `package.json` file with that version
* release the bundle on the [NPM registry](https://www.npmjs.com/)

The script will automatically bump the version in the `package.json` file, and publish the new version of the `flight-icons` package.

_Notice: you will need a company-approved account on npm (with 2FA) to publish._

At this point check on [www.npmjs.com/package/@hashicorp/flight-icons](https://www.npmjs.com/package/@hashicorp/flight-icons) that the package has been successfully published (under the "versions" tab) and you're good. Well done you just published your new package! 🎉

**IMPORTANT**: if you need to do some tests, use a **local** package registry, not production! (see below)


## Local development

If you need to work on the scripts locally, here some useful information.

### Code check

You can also do some important sanity checks to the code via the commands:

```bash
# check type safety
yarn typecheck

# check code syntax
yarn lint
```

### Using a local NPM registry for testing

To test the release of packages without actually polluting the real/production npm registry, you cansetup a local registry using [Verdaccio](https://verdaccio.org/docs/what-is-verdaccio), an open source solution, very easy to setup and use.

You can follow [the instructions here](https://verdaccio.org/docs/installation) but essentially what you have to:

- install the package: `npm install -g verdaccio` - this will install it globally
- launch the service: `verdaccio` - this will serve a web frontend to the registry at the URL http://localhost:4873/
- add a user to the registry: `npm adduser --registry http://localhost:4873` - this will ask you a username/password/email, I suggest to use test/test/test@test.com because is just a local instance; this will also authenticate you with the registry so when you publish yuo don't need to login.

Now you need to add this entry in the `package.json` files of `flight-icons`:

```
"publishConfig": {
    "registry": "http://localhost:4873"
},
```

This will make sure the package is published on Verdaccio. Once the package is published, the web frontend accesible at http://localhost:4873/ will show you all the details about the packages (and if needed you can also download the tarballs, to check their content).

Once you've done testing, you can remove verdaccio via `npm uninstall -g verdaccio` and then remove the files he created using `rm -fr ~/.local/share/verdaccio && rm -fr .config/verdaccio`. You can use the same command to cleanup the entire data storage of Verdaccio and start from scratch (no need to reinstall for this, just cleanup the data).

## 🚧 [WIP] GitHub action

Run the GitHub action `flight_compile` to execute the `sync → build → release` process.

All the updated assets and the generated bundles will be automatically committed to this repo, and the packages released to NPM.
