# Showcase checks

Run all of the checks listed below and ensure all pass as expected. Capture any failures and report them back to the user.

## Build procedure

1. Under `showcase` run `pnpm build`

## Linting

1. Under `showcase` run `pnpm lint`
2. If issues are found, run `pnpm lint:fix` and `pnpm lint:format --write` to fix them

## Test suite (optional)

If changes have been made under `showcase/tests` (acceptance tests) those test cases should be checked by running their associated tests. Component integration and unit tests live in `packages/components/tests`, see `package-components-checks.md`.

For each changed test file perform the following:
1. Under `showcase` run `ember t -f {component-name}`
