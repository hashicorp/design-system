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

import type { SearchIconsInput, SearchIconsPayload } from "./search-icons.js";

const ICON_FILTER_KINDS = ["category", "size"] as const;

export const toSearchIconsTelemetry = defineToolTelemetry<
  SearchIconsInput,
  SearchIconsPayload
>((args, content) => {
  const { unknownFilters, filters } = content;

  return {
    ...toQueryShape(content.query),
    ...withDefined([
      ["limit", args.limit],
      ["topResult", content.results.at(0)?.iconName ?? null],
      [
        "unknownFilterKinds",
        toUnknownFilterKinds(unknownFilters, ICON_FILTER_KINDS),
      ],
      [
        "filterCategory",
        toKnownFilterValue("category", filters.category, unknownFilters),
      ],
      ["filterSize", toKnownFilterValue("size", filters.size, unknownFilters)],
      ["filterHasMapping", filters.hasMapping ?? null],
    ]),
  };
});
