/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";

import CODE_EXAMPLES_TOOLS from "../../../../src/tools/code-examples/index.js";
import {
  READ_CODE_EXAMPLE_TOOL_NAME,
  SEARCH_CODE_EXAMPLES_TOOL_NAME,
} from "../../../../src/tools/code-examples/constants.js";

describe("CODE_EXAMPLES_TOOLS", () => {
  it("exports an array of two tools", () => {
    expect(CODE_EXAMPLES_TOOLS).toHaveLength(2);
  });

  it("lists search before read", () => {
    expect(CODE_EXAMPLES_TOOLS[0]?.name).toBe(SEARCH_CODE_EXAMPLES_TOOL_NAME);
    expect(CODE_EXAMPLES_TOOLS[1]?.name).toBe(READ_CODE_EXAMPLE_TOOL_NAME);
  });

  it("each tool has a name, config, and executeCallback", () => {
    for (const tool of CODE_EXAMPLES_TOOLS) {
      expect(typeof tool.name).toBe("string");
      expect(tool.name.length).toBeGreaterThan(0);
      expect(tool.config).toBeDefined();
      expect(typeof tool.executeCallback).toBe("function");
    }
  });
});
