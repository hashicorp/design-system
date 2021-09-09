# Flight sync/build/release scripts

A pipeline for building the Flight iconset into a set of packages that can be consumed by other tooling and products.

---

## Usage

The pipeline can be run manually, on your local machine, or via GitHub actions. 

There are three distinct steps in the process:

### Sync

The synchronization step is executed by the `/scripts/sync.ts` file. To run this script use the following command in your CLI:

```bash
yarn sync
```

This action will:

* Retrieve the assets metadata from Figma via REST API
* Export the assets as `.svg` files into `/src/flight-icons-original/svg`
* Generate the `catalog.json` file into `/src/flight-icons-original`

### Build


[TODO]

### Release

[TODO]

### Code check
You can also do some important sanity checks to the code via the commands:

```bash
# check type safety
yarn typecheck

# check code syntax
yarn lint
```

## Local development

To run the scripts locally, follow these steps.

### Setup

*Notice: [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/getting-started/install) needs to be installed on your local machine.*

First of all clone the repository:

```bash
git clone https://github.com/hashicorp/flight
```

Then install the project dependencies:

```bash
# go to the "scripts" folder
cd /[your-local-project-path]/scripts

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

### Build

Finally, you can run the scripts commands via CLI:

```bash
# sync
yarn sync

# build
[TODO]

# release
[TODO]
```

## GitHub action

Run the GitHub action `flight_compile` to execute the `sync → build → release` process. 

All the updated assets and the generated bundles will be automatically committed to this repo, and the packages released to NPM.
