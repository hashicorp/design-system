# How To Contribute

## Linting

* `npm run lint`
* `npm run lint:fix`

## Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).


## Releasing a new npm version of the package

Follow the instructions for Changesets in the root [README](../../README.md).

## Testing local changes to the addon

* `cd flight/ember-flight-icons`
* Run `yarn link`. You'll get a response such as:

```bash
success Registered "@hashicorp/ember-flight-icons".
info You can now run `yarn link "@hashicorp/ember-flight-icons"` in the projects where you want to use this package and it will be used instead.
✨  Done in 0.06s.
```

(If necessary, run a `yarn unlink`.)

* In your external repo, e.g. https://github.com/hashicorp/design-system-playground-fastboot, run `yarn link "@hashicorp/ember-flight-icons"`
* In your external repo, manually add the path to the `package.json`. For example:

```json
"devDependencies": {
  "@hashicorp/ember-flight-icons": "link:~/your-path-here/flight/ember-flight-icons",
}
```

* Run `yarn` or `yarn install`
* You may need to copy code such as https://github.com/hashicorp/design-system/blob/main/packages/ember-flight-icons/tests/dummy/app/templates/application.hbs into the external app's `application.hbs` to see the results.
* If you want to test local changes to `ember-flight-icons`, add `isDevelopingAddon` to `ember-flight-icons/index.js`. The file will look something like the following:

```js
'use strict';

module.exports = {
  name: require('./package').name,
  isDevelopingAddon() {
    return true;
  },
};
```

## Copy standards

* When associated when Ember, refer to the npm package as "Ember addon" instead of just "addon".
  * Use "package" for other frameworks.
* Refer to [HashiCorp Voice, Style & Language Guidelines](https://docs.google.com/document/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit). _Note: This link is internal only._
