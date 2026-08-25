/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import { defineTool } from "../shared/define-tool.js";
import {
  toDocumentToolResponse,
  toJsonToolResponse,
  withSafeToolHandler,
} from "../shared/responses.js";
import {
  DEFAULT_READ_MAX_BYTES,
  MAX_FILTER_LENGTH,
  MAX_READ_MAX_BYTES,
  MIN_READ_MAX_BYTES,
  READ_DOCS_TOOL_NAME,
  SEARCH_DOCS_TOOL_NAME,
} from "./constants.js";
import { getOrLoadDocsStore } from "../../stores/docs/index.js";
import { getHeadingPath } from "../../stores/docs/lookup.js";
import {
  clampFilterValue,
  selectChunkContent,
  toSerializablePageLinks,
} from "./utils.js";

import type { ToolRegistration } from "../shared/define-tool.js";
import type { DocsCatalogStore } from "../../stores/docs/index.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

export const readDocInputShape = {
  id: z
    .string()
    .min(1)
    .max(MAX_FILTER_LENGTH)
    .describe(
      `Passage id from a ${SEARCH_DOCS_TOOL_NAME} result, e.g. 'components/button#code/how-to-use-this-component/full-width'.`,
    ),
  includeChildren: z
    .boolean()
    .default(false)
    .describe(
      "Also return the passages nested under this heading. Use when the passage is a section header whose detail lives in its subsections.",
    ),
  maxBytes: z
    .number()
    .int()
    .min(MIN_READ_MAX_BYTES)
    .max(MAX_READ_MAX_BYTES)
    .default(DEFAULT_READ_MAX_BYTES)
    .describe(
      `Byte cap on the returned markdown (${MIN_READ_MAX_BYTES}-${MAX_READ_MAX_BYTES}). Defaults to ${DEFAULT_READ_MAX_BYTES}.`,
    ),
};

export interface ReadDocInput {
  id: string;
  includeChildren: boolean;
  maxBytes: number;
}

const DESCRIPTION = [
  "Read one passage of the bundled Helios Design System documentation by id, as markdown.",
  `Ids come from ${SEARCH_DOCS_TOOL_NAME}; run that first rather than guessing an id.`,
  "The returned markdown keeps the <Doc::*> and <Hds::*> usage examples and the inlined code snippets, which is what search snippets strip out.",
  "The corpus is a snapshot committed into this server: nothing is fetched. The first content block carries the canonical URL and the bundledAt timestamp so a client can fetch the live page itself.",
].join(" ");

export const readDoc = (
  store: DocsCatalogStore,
  input: ReadDocInput,
): CallToolResult => {
  const meta = store.getMeta();
  const requestedId = clampFilterValue(input.id);
  const chunk = store.getChunkById(requestedId);

  if (chunk === null) {
    return toJsonToolResponse({
      found: false,
      requestedId,
      message: `No documentation passage found for id "${requestedId}". Ids come from ${SEARCH_DOCS_TOOL_NAME} results.`,
      suggestions: store.suggestChunkIds(requestedId),
      bundledAt: meta.bundledAt,
      siteBaseUrl: meta.siteBaseUrl,
    });
  }

  const children = store.getChildChunks(chunk.id);
  const requested = input.includeChildren ? [chunk, ...children] : [chunk];
  const { content, truncated, includedIds, omittedIds } = selectChunkContent(
    requested,
    input.maxBytes,
  );
  const page = store.getPageByRoute(chunk.route);
  const links = page === null ? undefined : toSerializablePageLinks(page);

  return toDocumentToolResponse(
    {
      found: true,
      id: chunk.id,
      title: chunk.pageTitle,
      route: chunk.route,
      docsPath: chunk.route,
      section: chunk.section,
      ...(chunk.tab === undefined ? {} : { tab: chunk.tab }),
      headingPath: getHeadingPath(chunk),
      ...(chunk.level === undefined ? {} : { level: chunk.level }),
      url: chunk.url,
      pageUrl: chunk.pageUrl,
      ...(page === null || page.related.length === 0
        ? {}
        : { relatedDocsPaths: page.related }),
      ...(links === undefined ? {} : { links }),
      ...(page?.status === undefined ? {} : { status: page.status }),
      includedChunkIds: includedIds,
      ...(omittedIds.length === 0 ? {} : { omittedChunkIds: omittedIds }),
      childChunkCount: children.length,
      contentBytes: Buffer.byteLength(content, "utf8"),
      truncated,
      bundledAt: meta.bundledAt,
      siteBaseUrl: meta.siteBaseUrl,
      provenance: `Bundled snapshot of ${meta.siteBaseUrl} taken at ${meta.bundledAt}. Fetch ${chunk.url} for the live page.`,
    },
    content,
  );
};

export const createReadDocTool = (
  getStore: () => DocsCatalogStore,
): ToolRegistration => {
  const executeCallback: ToolCallback<typeof readDocInputShape> =
    withSafeToolHandler(READ_DOCS_TOOL_NAME, (input) =>
      readDoc(getStore(), input),
    );

  return defineTool<typeof readDocInputShape>({
    name: READ_DOCS_TOOL_NAME,
    config: {
      title: "Read an HDS documentation passage",
      description: DESCRIPTION,
      inputSchema: readDocInputShape,
      annotations: {
        readOnlyHint: true,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    executeCallback,
  });
};

const readDocTool = createReadDocTool(getOrLoadDocsStore);

export default readDocTool;
