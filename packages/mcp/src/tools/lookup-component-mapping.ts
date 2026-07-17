/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import type { McpTool } from "./types.js";

const currentDir = dirname(fileURLToPath(import.meta.url));
const mappingPath = resolve(currentDir, "../../../../.ai/migration/helios-to-carbon-component-map.json");

function loadMappings(): Record<string, unknown> {
  const raw = readFileSync(mappingPath, "utf8");
  const parsed = JSON.parse(raw) as { mappings: Record<string, unknown> };
  return parsed.mappings;
}

const inputSchema = {
  heliosComponent: z
    .string()
    .describe(
      'Helios component name to look up (e.g. "Hds::Button", "Hds::Alert", "Hds::Form::TextInput::Field")'
    ),
};

export const lookupComponentMappingTool: McpTool<typeof inputSchema> = {
  name: "lookup-component-mapping",
  config: {
    title: "Lookup Component Mapping",
    description:
      "Look up the Helios → Carbon Web Components mapping for a specific Helios component. Returns the full mapping entry including CWC component name, attribute transforms, events, slots, confidence score, and risk flags.",
    inputSchema,
  },
  executeCallback: ({ heliosComponent }) => {
    try {
      const mappings = loadMappings();

      if (!(heliosComponent in mappings)) {
        const available = Object.keys(mappings).join(", ");
        return {
          content: [
            {
              type: "text",
              text: `No mapping found for "${heliosComponent}". Available components: ${available}`,
            },
          ],
          isError: true,
        };
      }

      const entry = mappings[heliosComponent];
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ component: heliosComponent, mapping: entry }, null, 2),
          },
        ],
      };
    } catch (error: unknown) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to load mapping table: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  },
};
