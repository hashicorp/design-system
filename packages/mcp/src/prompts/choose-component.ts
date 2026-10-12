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
    "The user interaction to support, including constraints and any candidate components.",
  ),
  context: optionalPromptTextArgument(
    "Optional application context, such as placement, data size, or accessibility needs.",
  ),
};

const chooseComponentPrompt: McpPrompt<typeof argsSchema> = {
  name: "choose_hds_component",
  config: {
    title: "Choose a Helios component",
    description:
      "Recommend a Helios component or pattern for an interaction using documented guidance and resolved component APIs.",
    argsSchema,
  },
  callback: ({ requirements, context }) =>
    createPromptResult(
      "Choose an appropriate Helios component or pattern.",
      `Help select an existing Helios Design System component or pattern for the supplied requirements.

1. Identify the interaction and constraints. Ask a focused clarification only if missing context would materially change the choice.
2. Use ${SEARCH_DOCS_TOOL_NAME} to discover relevant components and patterns by interaction. Use ${READ_DOCS_TOOL_NAME} with IDs returned by search to read usage guidance, alternatives, and accessibility considerations; do not decide from search snippets alone.
3. Use ${SEARCH_COMPONENTS_TOOL_NAME} for candidate names, then ${GET_COMPONENT_TOOL_NAME} to confirm their exact names and relevant APIs. Component name search is not semantic discovery. Use the returned docsPath to focus further documentation searches. A documented pattern does not necessarily have an HDS component.
4. ${COMPONENT_EVIDENCE_GUIDANCE}

Return a concise recommendation with rationale tied to the requirements, at most two meaningful alternatives and their tradeoffs, key accessibility and application-owned responsibilities, and a verified API starting point with documentation links. State when no suitable HDS component is supported by the evidence. Stop at selection and handoff; do not generate a full implementation, edit files, or install dependencies.`,
      { requirements, context },
    ),
};

export default chooseComponentPrompt;
