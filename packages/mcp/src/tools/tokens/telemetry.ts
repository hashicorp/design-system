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

import type { SearchTokensInput, SearchTokensPayload } from "./search-tokens.js";

const TOKEN_FILTER_KINDS = ["category"] as const;

// agents search by value to replace a hard-coded color, which is a use worth counting apart
const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export const toSearchTokensTelemetry = defineToolTelemetry<
  SearchTokensInput,
  SearchTokensPayload
>((args, content) => {
  const { unknownFilters, filters } = content;

  return {
    ...toQueryShape(content.query),
    queryIsHexColor: HEX_COLOR_PATTERN.test(content.query.trim()),
    ...withDefined([
      ["limit", args.limit],
      ["topResult", content.results.at(0)?.key ?? null],
      // `type` is closed over the token types the schema declares
      ["filterType", filters.type ?? null],
      [
        "unknownFilterKinds",
        toUnknownFilterKinds(unknownFilters, TOKEN_FILTER_KINDS),
      ],
      [
        "filterCategory",
        toKnownFilterValue("category", filters.category, unknownFilters),
      ],
    ]),
  };
});
