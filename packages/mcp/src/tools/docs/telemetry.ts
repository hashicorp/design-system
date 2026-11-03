/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { withDefined } from "../../telemetry/properties.js";
import {
  toKnownFilterValue,
  toQueryShape,
  toUnknownFilterKinds,
} from "../../telemetry/sanitize.js";
import { defineToolTelemetry } from "../tool-telemetry.js";

import type { DocsCatalogStore } from "../../stores/docs/index.js";
import type { ToolTelemetryMapper } from "../../telemetry/tool-events.js";
import type { ReadDocInput } from "./read-doc.js";
import type { SearchDocsInput, SearchDocsPayload } from "./search-docs.js";

const DOCS_FILTER_KINDS = ["section", "tab", "docsPath"] as const;

// read_hds_docs declares no output schema, so the fields it reports are named here
interface ReadDocContent {
  found: boolean;
  docsPath?: string;
  contentBytes?: number;
  childChunkCount?: number;
  omittedChunkIds?: string[];
  suggestions?: string[];
}

/**
 * Search quality without the search: how many query words the corpus has never seen, and how
 * strongly the best passage scored. The unmatched words themselves are the likeliest place
 * for product context to leak, so only their count is sent.
 */
export const toSearchDocsTelemetry = defineToolTelemetry<
  SearchDocsInput,
  SearchDocsPayload
>((args, content) => {
  const topResult = content.results.at(0);
  const { unknownFilters, filters } = content;

  return {
    ...toQueryShape(content.query),
    matchedTermCount: content.matchedTerms.length,
    unmatchedTermCount: content.unmatchedTerms.length,
    anchoredResultCount: content.results.filter(
      (result) => result.pageAnchored,
    ).length,
    ...withDefined([
      ["limit", args.limit],
      ["topDocsPath", topResult?.docsPath ?? null],
      ["topScore", topResult?.score ?? null],
      ["topPageAnchored", topResult?.pageAnchored ?? null],
      [
        "unknownFilterKinds",
        toUnknownFilterKinds(unknownFilters, DOCS_FILTER_KINDS),
      ],
      [
        "filterSection",
        toKnownFilterValue("section", filters.section, unknownFilters),
      ],
      ["filterTab", toKnownFilterValue("tab", filters.tab, unknownFilters)],
      [
        "filterDocsPath",
        toKnownFilterValue("docsPath", filters.docsPath, unknownFilters),
      ],
    ]),
  };
});

/**
 * A missed id is never sent. When its page part names a real page, that page's catalog route
 * is, because it separates a stale heading anchor from an id that was invented outright.
 */
export const createReadDocTelemetry = (
  getStore: () => DocsCatalogStore,
): ToolTelemetryMapper =>
  defineToolTelemetry<ReadDocInput, ReadDocContent>((args, content) => {
    const request = {
      maxBytes: args.maxBytes,
      includeChildren: args.includeChildren,
    };

    if (content.found) {
      return {
        ...request,
        omittedChunkCount: content.omittedChunkIds?.length ?? 0,
        ...withDefined([
          ["docsPath", content.docsPath ?? null],
          ["contentBytes", content.contentBytes ?? null],
          ["childChunkCount", content.childChunkCount ?? null],
        ]),
      };
    }

    const page = getStore().getPageByRoute(args.id.split("#")[0]);

    return {
      ...request,
      knownPage: page !== null,
      suggestionCount: content.suggestions?.length ?? 0,
      ...withDefined([
        ["requestedDocsPath", page?.route ?? null],
        ["topSuggestion", content.suggestions?.at(0) ?? null],
      ]),
    };
  });
