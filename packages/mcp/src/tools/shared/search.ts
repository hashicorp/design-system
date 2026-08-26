/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import { normalizeLookupValue } from "../../shared/normalize.js";

export const MAX_FILTER_LENGTH = 256;

export interface FilterValueCheck {
  name: string;
  value: string | undefined;
  known: string[];
}

export const clampFilterValue = (value: string): string => {
  return value.slice(0, MAX_FILTER_LENGTH);
};

export const clampSearchLimit = (value: number, maxLimit: number): number => {
  return Math.min(Math.max(Math.trunc(value), 1), maxLimit);
};

export const searchLimitSchema = (maxLimit: number, defaultLimit: number) => {
  return z
    .number()
    .int()
    .min(1)
    .max(maxLimit)
    .default(defaultLimit)
    .describe(
      `Maximum results to return (1-${maxLimit}). Defaults to ${defaultLimit}.`,
    );
};

export const searchCountsOutputShape = {
  totalMatches: z.number().int(),
  returnedMatches: z.number().int(),
  truncated: z.boolean(),
};

export const collectUnknownFilters = (
  filters: FilterValueCheck[],
): string[] => {
  return filters.flatMap(({ name, value, known }) => {
    if (value === undefined) return [];

    const normalized = normalizeLookupValue(value);
    const isKnown = known.some(
      (candidate) => normalizeLookupValue(candidate) === normalized,
    );

    return isKnown ? [] : [`${name}: ${value}`];
  });
};
