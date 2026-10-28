/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// the one place that decides which caller-supplied text may leave the process
//
// queries and ids can carry a user's product context, so they are reduced to counts. the
// only caller text that is ever sent is a component name that has the strict shape of an
// hds name, because a guess at a public api is exactly the signal worth having

import type { TelemetryValue } from "./properties.js";

export const MAX_SENT_NAME_LENGTH = 64;

export type ComponentNameForm = "invocation" | "class" | "module" | "other";

const INVOCATION_PATTERN = /^hds(?:::[a-z0-9]+)+$/i;
const CLASS_PATTERN = /^hds[a-z0-9]+$/i;
const MODULE_PATTERN = /^hds(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)+$/i;

const capitalize = (segment: string): string =>
  segment.length === 0
    ? segment
    : `${segment[0].toUpperCase()}${segment.slice(1)}`;

const kebabToPascal = (segment: string): string =>
  segment.split("-").map(capitalize).join("");

export const toComponentNameForm = (value: string): ComponentNameForm => {
  const trimmed = value.trim();

  if (INVOCATION_PATTERN.test(trimmed)) {
    return "invocation";
  } else if (MODULE_PATTERN.test(trimmed)) {
    return "module";
  } else if (CLASS_PATTERN.test(trimmed)) {
    return "class";
  } else {
    return "other";
  }
};

/**
 * A requested component name, only when it has the shape of an hds name. Invocations and
 * module paths are rewritten to the invocation form so `hds/form/text-input` and
 * `hds::form::textInput` group with `Hds::Form::TextInput`; a class name cannot be split
 * back into its segments, so it keeps its own form. Anything else returns null.
 */
export const toHdsComponentName = (value: string): string | null => {
  const trimmed = value.trim();

  if (trimmed.length > MAX_SENT_NAME_LENGTH) {
    return null;
  }

  switch (toComponentNameForm(trimmed)) {
    case "invocation":
      return ["Hds", ...trimmed.split("::").slice(1).map(capitalize)].join(
        "::",
      );
    case "module":
      return ["Hds", ...trimmed.split("/").slice(1).map(kebabToPascal)].join(
        "::",
      );
    case "class":
      return `Hds${capitalize(trimmed.slice(3))}`;
    case "other":
      return null;
  }
};

export interface QueryShape {
  queryLength: number;
  queryWordCount: number;
}

export const toQueryShape = (query: string): QueryShape => {
  const trimmed = query.trim();

  return {
    queryLength: trimmed.length,
    queryWordCount: trimmed === "" ? 0 : trimmed.split(/\s+/).length,
  };
};

/**
 * `unknownFilters` entries read `kind: value`, and the value is whatever the caller made up,
 * so only the kind is kept — and only a kind the tool actually declares.
 */
export const toUnknownFilterKinds = (
  unknownFilters: string[],
  knownKinds: readonly string[],
): string | null => {
  const kinds = [
    ...new Set(
      unknownFilters
        .map((filter) => filter.split(":")[0].trim())
        .filter((kind) => knownKinds.includes(kind)),
    ),
  ].sort();

  return kinds.length === 0 ? null : kinds.join(",");
};

// a filter value is only sent when the tool resolved it against its own catalog
export const toKnownFilterValue = (
  kind: string,
  value: string | undefined,
  unknownFilters: string[],
): TelemetryValue | null => {
  const isUnknown = unknownFilters.some(
    (filter) => filter.split(":")[0].trim() === kind,
  );

  return value === undefined || isUnknown ? null : value;
};
