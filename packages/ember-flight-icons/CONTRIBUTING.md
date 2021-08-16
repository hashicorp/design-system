# How To Contribute

## Installation

* `git clone <repository-url>`
* `cd ember-flight-icons`
* `npm install`

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

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Test locally with another repository

* `cd flight/ember-flight-icons` (this directory)
* Run `yarn link`. You'll get a response such as:

```
success Registered "@hashicorp/ember-flight-icons".
info You can now run `yarn link "@hashicorp/ember-flight-icons"` in the projects where you want to use this package and it will be used instead.
✨  Done in 0.06s.
```

If necessary, run a `yarn unlink`.

* In your external repo, e.g. https://github.com/hashicorp/design-system-playground-fastboot, run `yarn link "@hashicorp/ember-flight-icons"`
* In your external repo, manually add the path to the `package.json`. For example:

```
"devDependencies": {
  ...
  "@hashicorp/ember-flight-icons": "link:~/your-path-here/flight/ember-flight-icons",
  ...
}
```

* Run `yarn` or `yarn install`
* You may need to copy code such as https://github.com/hashicorp/flight/blob/main/ember-flight-icons/tests/dummy/app/templates/application.hbs into the external app's `application.hbs` to see the results.
