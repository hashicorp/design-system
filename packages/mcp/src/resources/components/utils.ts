import type { JsonObject } from "../../types.js";
import type { ComponentSummary } from "./store/lookup.js";

export const toSerializableComponentSummary = (
  component: ComponentSummary,
): JsonObject => {
  return {
    name: component.name,
    description: component.description,
  };
};
