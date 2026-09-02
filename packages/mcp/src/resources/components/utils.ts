/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type {
  ComponentRecord,
  ComponentSummary,
} from "../../stores/components/lookup.js";
import type { JsonObject } from "../../types.js";

export const toSerializableComponentSummary = (
  component: ComponentSummary,
): JsonObject => {
  return {
    name: component.name,
    modulePath: component.modulePath,
    ...(component.docsPath === undefined
      ? {}
      : { docsPath: component.docsPath }),
  };
};

export const toSerializableComponent = (
  component: ComponentRecord,
): JsonObject => {
  return {
    name: component.name,
    modulePath: component.modulePath,
    ...(component.docsPath === undefined
      ? {}
      : { docsPath: component.docsPath }),
    ...(component.element === undefined ? {} : { element: component.element }),
    args: component.args.map((arg) => ({
      name: arg.name,
      type: arg.type,
      required: arg.required,
      ...(arg.values === undefined ? {} : { values: arg.values }),
      ...(arg.inheritedFrom === undefined
        ? {}
        : { inheritedFrom: arg.inheritedFrom }),
    })),
    blocks: component.blocks.map((block) => ({
      name: block.name,
      yields: block.yields.map((blockYield) => ({
        name: blockYield.name,
        type: blockYield.type,
      })),
    })),
  };
};
