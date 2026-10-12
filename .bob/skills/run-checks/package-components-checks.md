# Components package checks

Run all of the checks listed below and ensure all pass as expected. Capture any failures and report them back to the user.

## Build procedure

1. Under `packages/components` run `pnpm build`

## Linting

1. Under `packages/components` run `pnpm lint`
2. If issues are found, run `pnpm lint:fix` and `pnpm lint:format --write` to fix them

## Component integration tests

If changes have been made to components, helpers, or modifiers files under `packages/components/src` run their associated integration tests

**IMPORTANT:** All integration testing must be run from the root of the `showcase` directory

For each changed component, helper, modifier, or service perform the following:
1. Under `showcase` run `ember t -f {component-name}`
