/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  GET_COMPONENT_TOOL_NAME,
  SEARCH_COMPONENTS_TOOL_NAME,
} from "../tools/components/constants.js";
import {
  READ_DOCS_TOOL_NAME,
  SEARCH_DOCS_TOOL_NAME,
} from "../tools/docs/constants.js";
import {
  COMPONENT_EVIDENCE_GUIDANCE,
  createPromptResult,
  optionalPromptTextArgument,
  promptTextArgument,
} from "./shared.js";

import type { McpPrompt } from "./types.js";

const argsSchema = {
  requirements: promptTextArgument(
    "The interaction or pattern to implement, including required behavior and constraints.",
  ),
  code: optionalPromptTextArgument(
    "Optional existing code to adapt while preserving its relevant behavior.",
    20_000,
  ),
  context: optionalPromptTextArgument(
    "Optional application context, such as placement, data flow, Ember conventions, or accessibility needs.",
  ),
};

const implementPatternPrompt: McpPrompt<typeof argsSchema> = {
  name: "implement_hds_pattern",
  config: {
    title: "Implement a Helios pattern",
    description:
      "Produce a focused Helios pattern implementation using documented guidance and verified component APIs.",
    argsSchema,
  },
  callback: ({ requirements, code, context }) =>
    createPromptResult(
      "Implement a Helios interaction or pattern.",
      `Help implement the supplied interaction using existing Helios Design System components and documented patterns.

1. Identify the required behavior and constraints, including relevant behavior in any existing code. Ask a focused clarification only if missing context would materially change the implementation.
2. Use ${SEARCH_DOCS_TOOL_NAME} to discover relevant patterns and components by interaction, then ${READ_DOCS_TOOL_NAME} with returned IDs to read composition, usage, and accessibility guidance. Do not decide from search snippets alone. A documented pattern does not necessarily have a dedicated HDS component.
3. Use ${SEARCH_COMPONENTS_TOOL_NAME} for candidate names, then ${GET_COMPONENT_TOOL_NAME} to verify exact component names, arguments, yielded components, and event APIs before writing code. Use docsPath from results to focus further documentation searches.
4. ${COMPONENT_EVIDENCE_GUIDANCE}
5. Produce a focused Ember implementation in single-file TypeScript Glimmer (.gts) format. Use verified imports and APIs, keep state ownership and event handling explicit, and distinguish application-provided data, handlers, and services from HDS capabilities. Preserve relevant existing behavior. Address accessible names, keyboard interaction, focus handling, and validation or error states where applicable. If no suitable HDS component or pattern is supported by the evidence, explain the gap instead of inventing an API.

Return a brief approach, implementation code, integration assumptions and application-owned responsibilities, and documentation links. Include meaningful ember-qunit integration test examples for the interaction and applicable accessibility behavior. Clearly label placeholders and unverified assumptions; do not claim code or tests were executed. Provide the implementation in the response; do not edit files or install dependencies.`,
      { requirements, code, context },
    ),
};

export default implementPatternPrompt;
