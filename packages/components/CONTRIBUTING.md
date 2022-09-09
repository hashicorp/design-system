# How To Contribute

## Installation

* `git clone <repository-url>`
* `yarn install`
* `cd packages/components`

## Linting

* `yarn run lint`
* `yarn run lint:fix`

## Stylelinting

* `yarn run lint:css`
* `yarn run lint:css:fix`

Notice: to have VSCode autofix the code on save, you have to:
- install the [Stylelint extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- in either the user or workspace settings add the entry `"source.fixAll.stylelint": true` to the `editor.codeActionsOnSave` option

## Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

* `ember s`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
