# Website checks

Run all of the checks listed below and ensure all pass as expected. Capture any failures and report them back to the user.

## Build procedure

1. Under `website` run `pnpm build`

## Linting

1. Under `website` run `pnpm lint`
2. If issues are found, run `pnpm lint:fix` and `pnpm lint:format --write` to fix them

## Test suite (optional)

If changes have been made to a website page under `docs` those test cases should be checked by running their associated tests

For each changed page perform the following:
1. Under `website` run `ember t -f {docs/changed-page-file-path}`. Ex: `ember t -f components/stepper/list`
