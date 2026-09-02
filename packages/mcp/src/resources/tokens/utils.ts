/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TokenSummary } from "../../stores/tokens/lookup.js";
import type { JsonObject } from "../../types.js";

export const toSerializableTokenSummary = (token: TokenSummary): JsonObject => {
  return {
    key: token.key,
    name: token.name,
    type: token.type,
    value: token.value,
    cssVar: token.cssVar,
    category: token.category,
    path: token.path,
  };
};
