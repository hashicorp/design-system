# HDS template lint evaluations

Private evaluation package for
`@hashicorp/ember-template-lint-plugin-hds`. Its A/C flow is adapted from
`shadcn-ui/lint`:

1. **A (baseline):** a provider generates the requested file in a clean copy
   of the single fixture.
2. The runner checks that output exists, is non-empty, parses, and produces
   the expected normalized HDS lint findings.
3. **C (correction):** A is copied byte-for-byte, then the same provider gets
   those findings for at most two correction rounds.
4. The runner classifies suppression, removed HDS usage, changed system
   files, parse failures, and remaining violations. These cannot score green.

Results are checkpointed after generation and every correction round to
`results/<run>/results.json`. The versioned JSON includes normalized findings,
durations, nullable token/cost usage, classifications, round history, and
aggregate counts.

## Deterministic smoke tests

The default provider only returns checked-in baseline and correction strings.
It makes no network calls and is safe for CI:

```sh
pnpm --filter @hashicorp/ember-template-lint-plugin-hds-evals test
pnpm --filter @hashicorp/ember-template-lint-plugin-hds-evals eval
```

Each file under `scenarios/` is an independent JSON scenario with `id`,
`prompt`, `file`, optional `tags`/`fixture`, `baseline`,
`expectedCorrection`, `expectedBaselineRules`, and task-preservation
`assertions` (`includes`/`excludes`). Add a scenario there and run the
deterministic tests. Keep each baseline focused so its exact rule list is
stable. The deterministic provider must reproduce `expectedCorrection`
byte-for-byte; model providers must satisfy the assertions, so merely deleting
the bad argument or swapping in an unrelated HDS component cannot pass.

## Optional agent experiments

Agent/model runs are manual only. No paid provider, SDK, credential, or model
is configured in CI. A provider module exports:

```js
export const metadata = {
  kind: "model",
  name: "local-runner",
  model: "model-name",
};

export async function generate({ scenario, workdir }) {
  // Write scenario.file under workdir, or return { source }.
  return { source: "...", usage: { inputTokens: 0, outputTokens: 0 } };
}

export async function correct({ scenario, workdir, findings, round }) {
  // C already contains A verbatim. Modify it or return replacement source.
  return { source: "...", usage: { inputTokens: 0, outputTokens: 0 } };
}
```

Run it with:

```sh
pnpm --filter @hashicorp/ember-template-lint-plugin-hds-evals eval \
  --provider ./path/to/provider.mjs --timeout-ms 300000
```

The adapter owns external execution and secrets. The harness owns fixture
copying, timeouts, checks, classification, and reporting. Visual fidelity,
drift, multiple built-in providers, paid CI, and cross-run aggregation are
intentionally deferred.
