import { TOKENS_URI, readTokensResource } from "./read-tokens.js";
import { withSafeResourceHandler } from "../utils.js";

import type { McpResource } from "../types.js";

export const TOKENS_URI = "hds://tokens";

const getTokensResource: McpResource = {
  name: "get_hds_tokens",
  uri: TOKENS_URI,
  config: {
    title: "HDS token catalog index",
    description: "Canonical list of tokens with summary metadata",
    mimeType: "application/json",
  },
  readCallback: withSafeResourceHandler(
    "hds_tokens",
    async () => {
      return readTokensResource(tokenStore);
    },
    TOKENS_URI,
  ),
};

const TOKENS_RESOURCES: McpResource[] = [getTokensResource];

export default TOKENS_RESOURCES;
