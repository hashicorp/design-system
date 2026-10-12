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
  component: promptTextArgument(
    "The Helios component name to troubleshoot.",
    200,
  ),
  code: promptTextArgument(
    "The code exhibiting the issue, including relevant template, state, and event handlers.",
    20_000,
  ),
  expectedBehavior: promptTextArgument("The behavior you expected to observe."),
  observedBehavior: promptTextArgument(
    "The actual behavior, including any error messages and reproduction steps.",
  ),
  context: optionalPromptTextArgument(
    "Optional application context, such as surrounding components, environment, or recent changes.",
  ),
};

const troubleshootComponentPrompt: McpPrompt<typeof argsSchema> = {
  name: "troubleshoot_hds_component",
  config: {
    title: "Troubleshoot a Helios component",
    description:
      "Diagnose a Helios component issue using supplied code, expected and observed behavior, and verified documentation and APIs.",
    argsSchema,
  },
  callback: ({
    component,
    code,
    expectedBehavior,
    observedBehavior,
    context,
  }) =>
    createPromptResult(
      "Troubleshoot unexpected Helios component behavior.",
      `Help diagnose the supplied Helios Design System component issue.

1. Compare expected and observed behavior and identify the smallest relevant interaction in the supplied code. Ask a focused clarification only if missing reproduction details would materially change the diagnosis. Do not assume omitted application code is absent.
2. Use ${SEARCH_COMPONENTS_TOOL_NAME} to resolve the component name, then ${GET_COMPONENT_TOOL_NAME} to verify its arguments, yielded components, composition, and event APIs. Use ${SEARCH_DOCS_TOOL_NAME}, focused by docsPath from component results, then ${READ_DOCS_TOOL_NAME} with returned IDs to read the documented interaction model and accessibility guidance. Do not decide from search snippets alone.
3. ${COMPONENT_EVIDENCE_GUIDANCE}
4. Trace state ownership, reactivity, event handlers, yielded component usage, and surrounding composition as relevant. For keyboard or focus issues, distinguish built-in behavior from application-owned accessibility responsibilities. Separate confirmed API misuse from hypotheses requiring runtime evidence. Do not attribute the issue to an HDS bug or version regression without supporting evidence.

Return likely causes ranked by evidence, with a code excerpt or location and documentation links for each. Give targeted diagnostic steps and the observation that would confirm or rule out each hypothesis, followed by the smallest supported correction. Include a focused regression test suggestion. If the cause cannot be established, request a minimal reproduction or specific missing evidence rather than asserting a diagnosis. Do not claim to have reproduced the issue or run tests; do not edit files or install dependencies.`,
      { component, code, expectedBehavior, observedBehavior, context },
    ),
};

export default troubleshootComponentPrompt;
