/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import getTokensResource from "./get-tokens.js";
import getTokenByKeyResource from "./get-token-by-key.js";

import type { McpResource } from "../types.js";

const TOKENS_RESOURCES: McpResource[] = [
  // TOKENS
  getTokensResource,
  getTokenByKeyResource,
];

export default TOKENS_RESOURCES;
