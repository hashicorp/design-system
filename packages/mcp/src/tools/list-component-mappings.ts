/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { McpTool } from "./types.js";

const currentDir = dirname(fileURLToPath(import.meta.url));
const mappingPath = resolve(currentDir, "../../../../.ai/migration/helios-to-carbon-component-map.json");

interface MappingEntry {
  cwcComponent: string;
  description: string;
  confidence: number;
  riskFlags: string[];
}

interface MappingFile {
  version: string;
  mappings: Record<string, MappingEntry>;
}

function loadMappingFile(): MappingFile {
  const raw = readFileSync(mappingPath, "utf8");
  return JSON.parse(raw) as MappingFile;
}

export const listComponentMappingsTool: McpTool<undefined> = {
  name: "list-component-mappings",
  config: {
    title: "List Component Mappings",
    description:
      "Returns a summary of all known Helios → Carbon Web Components mappings: component names, target CWC component, confidence score, and risk flags. Use this for dry-run reporting or to see what components are covered.",
  },
  executeCallback: () => {
    try {
      const { version, mappings } = loadMappingFile();

      const rows = Object.entries(mappings).map(([helios, entry]) => ({
        heliosComponent: helios,
        cwcComponent: entry.cwcComponent,
        confidence: entry.confidence,
        riskFlags: entry.riskFlags,
        description: entry.description,
      }));

      const summary = {
        version,
        totalMappings: rows.length,
        mappings: rows,
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(summary, null, 2),
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
