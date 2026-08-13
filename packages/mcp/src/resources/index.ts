/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { withSafeResourceHandler } from "./utils.js";

import flightIconsResources from "./flight-icons/index.js";
import tokensResources from "./tokens/index.js";

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { McpResource } from "./types.js";

const RESOURCES: McpResource[] = [...flightIconsResources, ...tokensResources];

export function registerResources(server: McpServer) {
  for (const resource of RESOURCES) {
    if ("uri" in resource) {
      server.registerResource(
        resource.name,
        resource.uri,
        resource.config,
        withSafeResourceHandler(resource.name, resource.readCallback),
      );
    } else if ("template" in resource) {
      server.registerResource(
        resource.name,
        resource.template,
        resource.config,
        withSafeResourceHandler(resource.name, resource.readCallback),
      );
    }
  }
}
