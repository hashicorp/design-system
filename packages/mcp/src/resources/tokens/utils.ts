import type { TokenSummary } from "./store/lookup.js";
import type { JsonObject } from "../../types.js";

export const toSerializableTokenSummary = (token: TokenSummary): JsonObject => {
  return {
    key: token.key,
    name: token.name,
    type: token.type,
    value: token.value,
    cssVar: token.cssVar,
    category: token.category,
    path: token.path,
  };
};
