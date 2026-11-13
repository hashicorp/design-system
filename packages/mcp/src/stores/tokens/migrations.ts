/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// the token renames and removals of a major tokens release, read from the tokens package's
// `migrations/<version>.json`, so a name from before it can be answered with what replaced it

import { z } from "zod";
import { createCatalogLoader } from "../../catalog/loader.js";
import { normalizeTokenLookupKey } from "./lookup.js";

export const TOKEN_MIGRATION_VERSION = "6.0.0";

const tokenMigrationSchema = z
  .object({
    version: z.string().min(1),
    renamedTokens: z.array(
      z.object({ before: z.string().min(1), after: z.string().min(1) }),
    ),
    removedTokens: z.array(z.string().min(1)),
  })
  .catchall(z.any());

export type TokenMigration =
  | { before: string; after: string; version: string }
  | { before: string; removed: true; version: string };

export interface TokenMigrations {
  // what became of a token name that no longer exists, whichever way the caller wrote it
  find: (name: string) => TokenMigration | null;
}

// `var(--token-x)`, `--token-x` and `token-x` all name the same old token
export const normalizeTokenName = (name: string): string => {
  return normalizeTokenLookupKey(
    name.trim().replace(/^var\(\s*/u, "").replace(/\s*\)$/u, ""),
  );
};

export const createTokenMigrations = (value: unknown): TokenMigrations => {
  const { version, renamedTokens, removedTokens } =
    tokenMigrationSchema.parse(value);
  const migrations = new Map<string, TokenMigration>([
    ...renamedTokens.map(
      ({ before, after }) =>
        [normalizeTokenName(before), { before, after, version }] as const,
    ),
    ...removedTokens.map(
      (before) =>
        [
          normalizeTokenName(before),
          { before, removed: true as const, version },
        ] as const,
    ),
  ]);

  return {
    find: (name) => migrations.get(normalizeTokenName(name)) ?? null,
  };
};

export const NO_TOKEN_MIGRATIONS: TokenMigrations = { find: () => null };

const tokenMigrationsLoader = createCatalogLoader<TokenMigrations>({
  specifier: `@hashicorp/design-system-tokens/migrations/${TOKEN_MIGRATION_VERSION}.json`,
  // a tokens package from before the file existed falls through to the server's own copy
  anchors: ["project-root", "components", "default"],
  create: (value) => createTokenMigrations(value),
});

// the hints are an aid, not the catalog, so a missing or unreadable file only means no hints;
// the outcome is kept either way so a missing file is not looked for again on every call
let tokenMigrations: TokenMigrations | null = null;

export const getOrLoadTokenMigrations = (): TokenMigrations => {
  if (tokenMigrations === null) {
    try {
      tokenMigrations = tokenMigrationsLoader.load();
    } catch {
      tokenMigrations = NO_TOKEN_MIGRATIONS;
    }
  }

  return tokenMigrations;
};
