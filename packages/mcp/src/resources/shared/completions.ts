/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// shared matching loop for resource template completion callback

import { normalizeLookupValue } from "../../shared/normalize.js";

export interface CompleteFromAliasesInput<Item> {
  items: Item[];
  getAliases: (item: Item) => string[];
  getValue: (item: Item) => string;
  value: string;
}

export const completeFromAliases = <Item>({
  items,
  getAliases,
  getValue,
  value,
}: CompleteFromAliasesInput<Item>): string[] => {
  const query = normalizeLookupValue(value);
  const matches: string[] = [];

  for (const item of items) {
    const aliases = getAliases(item);
    const isMatch =
      query.length === 0 ||
      aliases.some((alias) => alias.toLowerCase().includes(query));

    if (isMatch) {
      matches.push(getValue(item));
    }
  }

  return matches;
};

export const withSafeCompletion = (
  resourceName: string,
  complete: (value: string) => string[],
) => {
  return (value: string): string[] => {
    try {
      return complete(value);
    } catch (error: unknown) {
      console.error(`Resource completion failed (${resourceName}):`, error);

      return [];
    }
  };
};
