/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TokenCatalogRow } from "../../src/resources/tokens/store/schema.js";

export const buildTokenCatalogRow = (
  overrides: Partial<TokenCatalogRow> = {}
): TokenCatalogRow => ({
  key: "{border.radius.x-small}",
  $type: "dimension",
  $value: "3px",
  name: "token-border-radius-x-small",
  attributes: { category: "border" },
  path: ["border", "radius", "x-small"],
  original: {
    $type: "dimension",
    $value: "3",
    key: "{border.radius.x-small}",
  },
  ...overrides,
});
