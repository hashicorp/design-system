/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { loadTokenCatalog } from "../../../src/stores/tokens/index.js";
import { TOKEN_MIGRATION_VERSION } from "../../../src/stores/tokens/migrations.js";
import { searchTokens } from "../../../src/tools/tokens/search-tokens.js";

describe("token migrations", () => {
  // the tokens package owns the file, so a rename that no longer lands on a token must fail here
  it("points every renamed token at a token the catalog has", () => {
    const require = createRequire(import.meta.url);
    const { renamedTokens } = JSON.parse(
      readFileSync(
        require.resolve(
          `@hashicorp/design-system-tokens/migrations/${TOKEN_MIGRATION_VERSION}.json`,
        ),
        "utf8",
      ),
    ) as { renamedTokens: { before: string; after: string }[] };
    const store = loadTokenCatalog();

    expect(renamedTokens.length).toBeGreaterThan(0);
    expect(
      renamedTokens.filter(({ after }) => store.getTokenByKey(after) === null),
    ).toStrictEqual([]);
  });

  it("answers an old name with its replacement through the installed package", () => {
    const payload = searchTokens(loadTokenCatalog(), {
      query: "--token-color-foreground-action",
      limit: 1,
    });

    expect(payload.migration).toMatchObject({
      after: "--hds-foreground-color-action",
    });
    expect(payload.results[0]?.name).toBe("hds-foreground-color-action");
  });
});

describe("generated token catalog", () => {
  it("loads the package artifact and resolves its public aliases", () => {
    const store = loadTokenCatalog();
    const meta = store.getMeta();

    expect(meta.totalTokenCount).toBeGreaterThan(0);
    expect(store.listTokens()).toHaveLength(meta.totalTokenCount);
    expect(store.getTokenByKey("{border.radius.x-small}")?.key).toBe(
      "{border.radius.x-small}",
    );
    expect(store.getTokenByKey("border.radius.x-small")?.key).toBe(
      "{border.radius.x-small}",
    );
    expect(store.getTokenByKey("hds-border-radius-x-small")?.key).toBe(
      "{border.radius.x-small}",
    );
  });

  // the shape of `$modes` is the tokens package's, so a change to it must fail here
  it("reads each theme's value, and finds a token by a non-default one", () => {
    const store = loadTokenCatalog();
    const action = store.getTokenByKey("hds-foreground-color-action");
    const carbonValue = action?.modes?.["cds-g90"];

    expect(Object.keys(action?.modes ?? {})).toStrictEqual([
      "default",
      "cds-g0",
      "cds-g10",
      "cds-g90",
      "cds-g100",
    ]);
    expect(action?.modes?.default).toBe(action?.value);
    expect(carbonValue).not.toBe(action?.value);
    expect(
      store
        .searchTokens({ query: String(carbonValue), limit: 1_000 })
        .hits.map((token) => token.name),
    ).toContain("hds-foreground-color-action");
  });
});
