# How To Contribute

## Installation

- `git clone <repository-url>`
- `pnpm install`
- `cd packages/components`

## Building

- `pnpm build`

To set a watcher on files located in `src` and rebuild on change

- `pnpm start`

## Linting

- `pnpm lint`
- `pnpm lint:fix`

## Stylelinting

- `pnpm lint:css`
- `pnpm lint:css:fix`

Notice: to have VSCode autofix the code on save, you have to:

- install the [Stylelint extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- in either the user or workspace settings add the entry `"source.fixAll.stylelint": true` to the `editor.codeActionsOnSave` option

## Running tests

The integration tests live in `tests/` and run in a Vite test app

- `pnpm test` – Runs the test suite on the current Ember version
- `pnpm start:tests` – Starts the test app; visit `/tests/index.html` to run the tests in "watch mode"
- `pnpm dlx @embroider/try apply <scenario>`, then `pnpm install` and `pnpm test` – Runs the test suite against another Ember version (see `.try.mjs`; set `ENABLE_COMPAT_BUILD=true` for `ember-lts-5.12`)

The acceptance tests (one per showcase page) live in `showcase/tests`.

## Running the `showcase` application

- `cd showcase`
- `pnpm start`
- Visit the application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
