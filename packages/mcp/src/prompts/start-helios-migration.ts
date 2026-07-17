/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import type { McpPrompt } from "./types.js";

const argsSchema = {
  target: z
    .string()
    .describe(
      "File, directory, or glob scope to migrate (e.g. showcase/app/components/my-feature or showcase/app/**/*.gts)"
    ),
  mode: z
    .enum(["dry-run", "safe-only", "full"])
    .default("safe-only")
    .describe(
      "Migration mode: dry-run (analyze only), safe-only (apply high-confidence ≥0.90), full (safe + approved medium-confidence)"
    ),
};

export const startHeliosMigrationPrompt: McpPrompt<typeof argsSchema> = {
  name: "start-helios-migration",
  config: {
    title: "Start Helios → Carbon Migration",
    description:
      "Sets up the Helios → Carbon Web Components migration orchestrator context. Provides the target scope, mode, and all artifact paths needed to begin a migration run.",
    argsSchema,
  },
  callback: ({ target, mode }) => {
    const resolvedMode = mode ?? "safe-only";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `
# Start Helios → Carbon Web Components Migration

Use the \`helios-to-carbon-orchestrator\` skill to run a migration with the following parameters:

## Inputs

- **Target scope:** \`${target}\`
- **Mode:** \`${resolvedMode}\`

## Artifact paths

- Mapping table: \`.ai/migration/helios-to-carbon-component-map.json\`
- Candidate schema: \`.ai/migration/schemas/migration-candidate.schema.json\`
- Migration plan output: \`migration-plan.json\` (workspace root)
- Migration report output: \`migration-report.md\` (workspace root)
- Report template: \`.ai/templates/migration-report-template.md\`

## Mode behaviour

${
  resolvedMode === "dry-run"
    ? "**dry-run:** Analyze only. Produce migration-plan.json and migration-report.md. Make no file edits."
    : resolvedMode === "safe-only"
      ? "**safe-only:** Apply only candidates with confidence ≥ 0.90. Skip all others and record them as manual follow-ups."
      : "**full:** Apply all high-confidence candidates (≥ 0.90). Present medium-confidence candidates (0.60–0.89) for explicit approval before applying."
}

## Available MCP tools

You have access to these tools to assist with the migration:
- \`list-component-mappings\` — get a summary of all 17 Helios → CWC mappings
- \`lookup-component-mapping\` — get the full mapping entry for a specific Helios component
- \`validate-migration-candidate\` — validate a candidate JSON record against the schema
- \`list-skills\` — list available .ai skills
- \`read-skill\` — load full skill instructions

## Next step

Begin Phase 0: resolve the target scope and initialize the report artifacts, then proceed through the orchestrator phases.
`.trim(),
          },
        },
      ],
    };
  },
};
