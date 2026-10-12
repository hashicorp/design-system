/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import readDocTool from "./read-doc.js";
import searchDocsTool from "./search-docs.js";

import type { ToolRegistration } from "../define-tool.js";

const DOCS_TOOLS: ToolRegistration[] = [searchDocsTool, readDocTool];

export default DOCS_TOOLS;
