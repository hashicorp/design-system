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
  code: promptTextArgument(
    "The Helios component snippet to review, including relevant template, state, handlers, or styles.",
    20_000,
  ),
  context: optionalPromptTextArgument(
    "Optional intended behavior and application context, including accessibility needs.",
  ),
};

const reviewUsagePrompt: McpPrompt<typeof argsSchema> = {
  name: "review_hds_usage",
  config: {
    title: "Review Helios usage",
    description:
      "Review a Helios code snippet against resolved component APIs and documented usage and accessibility guidance.",
    argsSchema,
  },
  callback: ({ code, context }) =>
    createPromptResult(
      "Review Helios usage and suggest prioritized corrections.",
      `Review the supplied code for correct Helios Design System usage.

1. Identify the components and intended interaction. Ask a focused clarification only if missing context would materially change the review. Do not assume omitted application code is absent.
2. Use ${SEARCH_COMPONENTS_TOOL_NAME} to resolve component names, then ${GET_COMPONENT_TOOL_NAME} to verify their arguments, yielded components, composition, and relevant APIs. Use ${SEARCH_DOCS_TOOL_NAME}, focused by docsPath from component results, then ${READ_DOCS_TOOL_NAME} with returned IDs to read usage and accessibility guidance. Do not decide from search snippets alone.
3. ${COMPONENT_EVIDENCE_GUIDANCE}
4. Check unsupported arguments, incorrect composition, state and event handling, and documented application-owned accessibility responsibilities such as accessible names, keyboard interaction, and focus handling. Identify custom markup or styling that duplicates a verified HDS capability only when replacement would preserve the intended behavior. Separate confirmed issues from questions requiring runtime checks; static review does not establish accessibility conformance.

Return prioritized findings with severity, the relevant code location or excerpt, documented evidence and links, impact, and a minimal suggested correction. Include targeted verification steps for behavior and accessibility. If there are no supported findings, say so and identify any unresolved checks. Keep the response focused on review rather than rewriting the entire snippet; do not edit files or install dependencies.`,
      { code, context },
    ),
};

export default reviewUsagePrompt;
