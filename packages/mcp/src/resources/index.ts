/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { withSafeResourceHandler } from "./responses.js";
import { NOOP_TELEMETRY, withResourceTelemetry } from "../telemetry/index.js";

import hdsIconsResources from "./hds-icons/index.js";
import tokensResources from "./tokens/index.js";
import componentsResources from "./components/index.js";

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Telemetry } from "../telemetry/index.js";
import type { McpResource } from "./types.js";

const RESOURCES: McpResource[] = [
  ...componentsResources,
  ...hdsIconsResources,
  ...tokensResources,
];

// telemetry wraps the raw handler, inside the safe guard, so a thrown error is still seen
// and reported before the guard turns it into an error payload
export function registerResources(
  server: McpServer,
  telemetry: Telemetry = NOOP_TELEMETRY,
) {
  for (const resource of RESOURCES) {
    if ("uri" in resource) {
      server.registerResource(
        resource.name,
        resource.uri,
        resource.config,
        withSafeResourceHandler(
          resource.name,
          withResourceTelemetry(
            resource.name,
            resource.readCallback,
            telemetry,
          ),
        ),
      );
    } else if ("template" in resource) {
      server.registerResource(
        resource.name,
        resource.template,
        resource.config,
        withSafeResourceHandler(
          resource.name,
          withResourceTelemetry(
            resource.name,
            resource.readCallback,
            telemetry,
          ),
        ),
      );
    }
  }
}
