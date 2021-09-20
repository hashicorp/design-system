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

### SVG icon updates

If the SVGs are being updated, you must bump both `@hashicorp/flight-icons` and `@hashicorp/ember-flight-icons`. Please see [flight-icons/CONTRIBUTING](https://github.com/hashicorp/flight/blob/main/flight-icons/CONTRIBUTING.md) for those instructions.

### Just an update to `ember-flight-icons`, not `flight-icons`

The release process is in two steps.

In the first step you need to do a "bump" of the version, which will increase the version number in the `package.json` file:

- Create new custom branch from `main`.
- `cd /[your-local-project-path]/flight/ember-flight-icons`
- Run `yarn bump` to have tooling automatically update the version for you. Choose the correct version following SemVer.
- Commit, push, open PR, wait for approval.

Once the PR has been merged to `main`, you can move to the next step.

In the second step you publish the package on the npm registry:

- Make sure your local `main` branch is up to date.
- You will need 2FA enabled on npm to publish packages, see [npm 2FA docs](https://docs.npmjs.com/configuring-two-factor-authentication) for more info.
- `cd /[your-local-project-path]/flight/ember-flight-icons`
- `yarn release`
- Check [www.npmjs.com/package/@hashicorp/flight-icons](https://www.npmjs.com/package/@hashicorp/flight-icons) and [www.npmjs.com/package/@hashicorp/ember-flight-icons](https://www.npmjs.com/package/@hashicorp/ember-flight-icons).
- Profit! 🎉

_**IMPORTANT**: if you need to do some tests, use a **local** package registry (see [CONTRIBUTING](../flight-icons/CONTRIBUTING.md) in the `flight-icon`), don't test directly in production!_

### How to do some manual QA of the new package version

- Bump the `@hashicorp/ember-flight-icons` version in [hashicorp/design-system-playground/blob/main/package.json](https://github.com/hashicorp/design-system-playground/blob/main/package.json)
- `yarn`
- `ember s`
- Confirm you see icon on the homepage in local dev.

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
