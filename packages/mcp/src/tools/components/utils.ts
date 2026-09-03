/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { MAX_ARG_VALUES } from "./constants.js";

import type { ComponentArg } from "../../stores/components/schema.js";
import type { ComponentRecord } from "../../stores/components/lookup.js";

export interface SerializableComponentArg {
  name: string;
  type: string;
  required: boolean;
  values?: string[];
  valuesCount?: number;
  valuesTruncated?: boolean;
  inheritedFrom?: string;
}

export interface SerializableComponentApi {
  name: string;
  modulePath: string;
  docsPath?: string;
  element?: string;
  args: SerializableComponentArg[];
  blocks: { name: string; yields: { name: string; type: string }[] }[];
}

// `valuesCount` and `valuesTruncated` are only present when the cap actually bit, so the
// common case stays as small as it reads
export const toSerializableArg = (
  arg: ComponentArg
): SerializableComponentArg => {
  const isTruncated =
    arg.values !== undefined && arg.values.length > MAX_ARG_VALUES;

  return {
    name: arg.name,
    type: arg.type,
    required: arg.required,
    ...(arg.values === undefined
      ? {}
      : { values: arg.values.slice(0, MAX_ARG_VALUES) }),
    ...(isTruncated
      ? { valuesCount: arg.values?.length, valuesTruncated: true }
      : {}),
    ...(arg.inheritedFrom === undefined
      ? {}
      : { inheritedFrom: arg.inheritedFrom }),
  };
};

export const toSerializableComponentApi = (
  component: ComponentRecord
): SerializableComponentApi => {
  return {
    name: component.name,
    modulePath: component.modulePath,
    ...(component.docsPath === undefined
      ? {}
      : { docsPath: component.docsPath }),
    ...(component.element === undefined ? {} : { element: component.element }),
    args: component.args.map((arg) => toSerializableArg(arg)),
    blocks: component.blocks.map((block) => ({
      name: block.name,
      yields: block.yields.map((blockYield) => ({
        name: blockYield.name,
        type: blockYield.type,
      })),
    })),
  };
};
