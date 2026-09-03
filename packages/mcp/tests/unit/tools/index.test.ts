/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { registerTools } from "../../../src/tools/index.js";
import { SEARCH_COMPONENTS_TOOL_NAME } from "../../../src/tools/components/constants.js";
import {
  READ_DOCS_TOOL_NAME,
  SEARCH_DOCS_TOOL_NAME,
} from "../../../src/tools/docs/constants.js";
import { SEARCH_ICONS_TOOL_NAME } from "../../../src/tools/hds-icons/constants.js";
import { SEARCH_TOKENS_TOOL_NAME } from "../../../src/tools/tokens/constants.js";
import { captureToolRegistrations } from "../../support/tool-registration.js";

// every tool reaches the server through its domain barrel, and a barrel that is empty or
// left out of src/tools/index.ts fails silently: the tool keeps passing its own tests while
// no client can call it. this pins the exposed surface so that gap is a failure, not a shrug.
const EXPECTED_TOOL_NAMES = [
  READ_DOCS_TOOL_NAME,
  SEARCH_COMPONENTS_TOOL_NAME,
  SEARCH_DOCS_TOOL_NAME,
  SEARCH_ICONS_TOOL_NAME,
  SEARCH_TOKENS_TOOL_NAME,
];

describe("registerTools", () => {
  it("exposes every tool the package implements, one registration each", () => {
    const registrations = captureToolRegistrations(registerTools);
    const names = registrations.map(({ name }) => name).sort();

    expect(names).toStrictEqual([...EXPECTED_TOOL_NAMES].sort());
  });

  it("gives each registered tool a callback and a described input schema", () => {
    const registrations = captureToolRegistrations(registerTools);

    for (const { name, config, callback } of registrations) {
      expect(callback, `${name} is missing a callback`).toBeTypeOf("function");
      expect(
        config.inputSchema,
        `${name} is missing an inputSchema`
      ).toBeDefined();
      expect(config.description, `${name} is missing a description`).toBeTypeOf(
        "string"
      );
    }
  });
});
