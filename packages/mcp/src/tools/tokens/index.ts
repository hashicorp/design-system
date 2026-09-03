/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import searchTokensTool from "./search-tokens.js";

import type { ToolRegistration } from "../shared/define-tool.js";

const TOKENS_TOOLS: ToolRegistration[] = [searchTokensTool];

export default TOKENS_TOOLS;
