/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { createTokenCatalogStore } from "../../../../src/stores/tokens/index.js";
import { createTokenMigrations } from "../../../../src/stores/tokens/migrations.js";
import { buildTokenCatalogRow } from "../../../support/token-catalog.js";

const migrations = createTokenMigrations({
  version: "6.0.0",
  renamedTokens: [
    {
      before: "--token-color-foreground-action",
      after: "--hds-foreground-color-action",
    },
  ],
  removedTokens: ["--token-tooltip-focus-offset"],
});

describe("createTokenMigrations", () => {
  it("finds an old name however it is written", () => {
    for (const name of [
      "--token-color-foreground-action",
      "token-color-foreground-action",
      "var(--token-color-foreground-action)",
      " --TOKEN-COLOR-FOREGROUND-ACTION ",
    ]) {
      expect(migrations.find(name)).toStrictEqual({
        before: "--token-color-foreground-action",
        after: "--hds-foreground-color-action",
        version: "6.0.0",
      });
    }

    expect(migrations.find("--token-tooltip-focus-offset")).toStrictEqual({
      before: "--token-tooltip-focus-offset",
      removed: true,
      version: "6.0.0",
    });
    expect(migrations.find("--hds-foreground-color-action")).toBeNull();
  });
});

describe("findMigration", () => {
  it("leaves alone an old name that is still a token in the installed catalog", () => {
    // an app still on a tokens release from before the rename
    const store = createTokenCatalogStore(
      [
        buildTokenCatalogRow({
          key: "{color.foreground.action}",
          name: "token-color-foreground-action",
          path: ["color", "foreground", "action"],
        }),
      ],
      undefined,
      migrations,
    );

    expect(store.findMigration("var(--token-color-foreground-action)")).toBeNull();
    expect(store.findMigration("--token-tooltip-focus-offset")).toMatchObject({
      removed: true,
    });
  });
});
