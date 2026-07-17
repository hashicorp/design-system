/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import type { McpTool } from "./types.js";

// Re-implements the schema rules from .ai/migration/schemas/migration-candidate.schema.json
// without a runtime JSON schema validator dependency.

const transformOperationSchema = z.object({
  type: z.enum([
    "replaceTag",
    "renameAttribute",
    "removeAttribute",
    "addAttribute",
    "moveToSlot",
    "renameEvent",
    "transformValue",
    "manual",
  ]),
  from: z.string().optional(),
  to: z.string().optional(),
  valueMap: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
  notes: z.string().optional(),
});

const candidateSchema = z.object({
  id: z.string().min(1).regex(/^[a-zA-Z0-9_-]+$/),
  filePath: z.string().min(1),
  line: z.number().int().min(1),
  heliosComponent: z.string().min(5).regex(/^Hds::/),
  proposedCwcComponent: z.union([
    z.string().regex(/^cds-[a-z-]+$/),
    z.null(),
  ]),
  transformOperations: z.array(transformOperationSchema),
  confidence: z.number().min(0).max(1),
  riskFlags: z.array(
    z.enum([
      "breaking-change",
      "behavioral-difference",
      "semantic-difference",
      "no-equivalent",
      "manual-migration-required",
      "complex-transformation",
      "dismissal-pattern-change",
      "slot-to-attribute",
      "attribute-to-slot",
      "event-signature-change",
      "styling-difference",
      "accessibility-impact",
      "incomplete-mapping",
      "dynamic-attributes",
      "nested-usage",
    ])
  ),
  status: z.enum(["planned", "manual", "skipped"]),
  rationale: z.string().min(1),
  manualNotes: z.array(z.string().min(1)),
});

const inputSchema = {
  candidate: z
    .string()
    .describe("JSON string of the migration candidate record to validate"),
};

export const validateMigrationCandidateTool: McpTool<typeof inputSchema> = {
  name: "validate-migration-candidate",
  config: {
    title: "Validate Migration Candidate",
    description:
      "Validates a migration candidate JSON object against the migration-candidate schema. Returns pass/fail and a list of validation errors. Use this after generating candidates in Phase 1 to ensure schema compliance before writing migration-plan.json.",
    inputSchema,
  },
  executeCallback: ({ candidate }) => {
    let parsed: unknown;

    try {
      parsed = JSON.parse(candidate) as unknown;
    } catch {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              valid: false,
              errors: ["Input is not valid JSON"],
            }),
          },
        ],
        isError: true,
      };
    }

    const result = candidateSchema.safeParse(parsed);

    if (result.success) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ valid: true, errors: [] }),
          },
        ],
      };
    }

    const errors = result.error.issues.map(
      (issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ valid: false, errors }),
        },
      ],
      isError: true,
    };
  },
};
