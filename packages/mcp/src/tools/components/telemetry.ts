/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { withDefined } from "../../telemetry/properties.js";
import {
  toComponentNameForm,
  toHdsComponentName,
  toQueryShape,
} from "../../telemetry/sanitize.js";
import { defineToolTelemetry } from "../tool-telemetry.js";

import type {
  GetComponentInput,
  GetComponentPayload,
} from "./get-component.js";
import type {
  SearchComponentsInput,
  SearchComponentsPayload,
} from "./search-components.js";

/**
 * A miss reports the requested name only when it has the shape of an hds name, which is the
 * signal for a component agents expect to exist; the suggestions are catalog names, so the
 * top one is public. A hit reports the catalog name it resolved to.
 */
export const toGetComponentTelemetry = defineToolTelemetry<
  GetComponentInput,
  GetComponentPayload
>((args, content) => {
  const requestedNameForm = toComponentNameForm(args.name);

  if (content.component !== undefined) {
    return {
      requestedNameForm,
      component: content.component.name,
      truncatedArgCount: content.component.args.filter(
        (arg) => arg.valuesTruncated === true,
      ).length,
    };
  }

  return withDefined([
    ["requestedNameForm", requestedNameForm],
    ["requestedName", toHdsComponentName(args.name)],
    ["suggestionCount", content.suggestions?.length ?? 0],
    ["topSuggestion", content.suggestions?.at(0) ?? null],
  ]);
});

export const toSearchComponentsTelemetry = defineToolTelemetry<
  SearchComponentsInput,
  SearchComponentsPayload
>((args, content) => ({
  ...toQueryShape(content.query),
  ...withDefined([
    ["limit", args.limit],
    ["topResult", content.results.at(0)?.name ?? null],
  ]),
}));
