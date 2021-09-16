# How To Contribute

## Installation

* `git clone <repository-url>`
* `cd ember-flight-icons`
* `yarn install`

## Linting

* `yarn run lint`
* `yarn run lint:fix`

## Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Releasing a new npm version of the package

To trigger a release, we have defined a special set of NPM scripts commands in the `package.json` file. Use the following command in your CLI:


```bash
yarn release
```

_**IMPORTANT**: if you need to do some tests, use a **local** package registry (see [CONTRIBUTING](../flight-icons/CONTRIBUTING.md) in the `flight-icon`), don't test directly in production!_

This action will:

* ask which _semver_ version you want to to use (the `bump` command is interactive, you can move up and down with the keyboard, choose one option, and then hit "enter").
* update the version in the `package.json` file
* automatically publish the new version of the `ember-flight-icons` package on the [NPM registry](https://www.npmjs.com/)

_Notice: you will need a company-approved account on npm (with 2FA) to publish._

At this point check on [www.npmjs.com/package/@hashicorp/ember-flight-icons](https://www.npmjs.com/package/@hashicorp/ember-flight-icons) that the package has been successfully published (under the "versions" tab) and you're good. Well done you just published your new package! 🎉


## Testing local changes to the addon

- `cd flight/ember-flight-icons`
- Run `yarn link`. You'll get a response such as:

```bash
success Registered "@hashicorp/ember-flight-icons".
info You can now run `yarn link "@hashicorp/ember-flight-icons"` in the projects where you want to use this package and it will be used instead.
✨  Done in 0.06s.
```

(If necessary, run a `yarn unlink`.)

- In your external repo, e.g. https://github.com/hashicorp/design-system-playground-fastboot, run `yarn link "@hashicorp/ember-flight-icons"`
- In your external repo, manually add the path to the `package.json`. For example:

```json
"devDependencies": {
  "@hashicorp/ember-flight-icons": "link:~/your-path-here/flight/ember-flight-icons",
}
```

- Run `yarn` or `yarn install`
- You may need to copy code such as https://github.com/hashicorp/flight/blob/main/ember-flight-icons/tests/dummy/app/templates/application.hbs into the external app's `application.hbs` to see the results.
- If you want to test local changes to `ember-flight-icons`, add `isDevelopingAddon` to `ember-flight-icons/index.js`. The file will look something like the following:

```js
'use strict';

module.exports = {
  name: require('./package').name,
  isDevelopingAddon() {
    return true;
  },
};
```
