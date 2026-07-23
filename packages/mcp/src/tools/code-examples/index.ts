/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import readCodeExampleTool from "./read-code-example.js";
import searchCodeExamplesTool from "./search-code-examples.js";

import type { RegisteredMcpTool } from "../types.js";

const CODE_EXAMPLES_TOOLS: RegisteredMcpTool[] = [
  searchCodeExamplesTool,
  readCodeExampleTool,
];

export default CODE_EXAMPLES_TOOLS;
