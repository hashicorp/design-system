import FLIGHT_ICONS_RESOURCES from "./flight-icons/index.js";

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { McpResource } from "./types.js";

const RESOURCES: McpResource[] = [...FLIGHT_ICONS_RESOURCES];

export function registerResources(server: McpServer) {
  for (const resource of RESOURCES) {
    if ("uri" in resource) {
      server.registerResource(
        resource.name,
        resource.uri,
        resource.config,
        resource.readCallback,
      );
    } else if ("template" in resource) {
      server.registerResource(
        resource.name,
        resource.template,
        resource.config,
        resource.readCallback,
      );
    }
  }
}
