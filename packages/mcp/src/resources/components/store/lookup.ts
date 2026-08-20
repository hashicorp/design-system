/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { normalizeLookupValue } from "../../flight-icons/store/lookup.js";

import type {
  ComponentArg,
  ComponentBlock,
  ComponentCatalogEntry,
} from "./schema.js";

export interface ComponentSummary {
  name: string;
  modulePath: string;
  docsPath?: string;
}

export interface ComponentRecord {
  name: string;
  modulePath: string;
  docsPath?: string;
  element?: string;
  args: ComponentArg[];
  blocks: ComponentBlock[];
}

const HDS_NAMESPACE_PREFIX = "hds::";

export const normalizeComponentName = (value: string): string => {
  const normalized = normalizeLookupValue(value);

  return normalized.startsWith(HDS_NAMESPACE_PREFIX)
    ? normalized.slice(HDS_NAMESPACE_PREFIX.length)
    : normalized;
};

export const getComponentLookupKeys = (
  entry: ComponentCatalogEntry,
): string[] => {
  const invocation = normalizeLookupValue(entry.name);
  const withoutNamespace = normalizeComponentName(entry.name);

  return [
    invocation,
    withoutNamespace,
    invocation.replaceAll("::", ""),
    withoutNamespace.replaceAll("::", ""),
  ];
};

const resolveArgValues = (
  arg: ComponentArg,
  valueSets: Record<string, string[]>,
): ComponentArg => {
  if (arg.valuesRef === undefined) {
    return arg;
  } else {
    const values = valueSets[arg.valuesRef];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { valuesRef: _valuesRef, ...rest } = arg;

    return values === undefined ? rest : { ...rest, values };
  }
};

export const toComponentRecord = (
  entry: ComponentCatalogEntry,
  valueSets: Record<string, string[]> = {},
): ComponentRecord => {
  return {
    name: entry.name,
    modulePath: entry.modulePath,
    ...(entry.docsPath === undefined ? {} : { docsPath: entry.docsPath }),
    ...(entry.element === undefined ? {} : { element: entry.element }),
    args: entry.args.map((arg) => resolveArgValues(arg, valueSets)),
    blocks: entry.blocks,
  };
};

export const toComponentSummary = (
  component: ComponentRecord,
): ComponentSummary => {
  return {
    name: component.name,
    modulePath: component.modulePath,
    ...(component.docsPath === undefined
      ? {}
      : { docsPath: component.docsPath }),
  };
};
