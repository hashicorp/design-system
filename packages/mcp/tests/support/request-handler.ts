/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import type {
  ServerNotification,
  ServerRequest,
} from "@modelcontextprotocol/sdk/types.js";

export const buildRequestHandlerExtra = (): RequestHandlerExtra<
  ServerRequest,
  ServerNotification
> => ({
  signal: new AbortController().signal,
  requestId: "test-request",
  sendNotification: async () => {},
  sendRequest: async () => {
    throw new Error("Unexpected request from resource callback");
  },
});
