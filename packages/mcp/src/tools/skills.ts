/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { dirname, resolve } from "node:path";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import type { McpTool } from "./types.js";

const currentDir = dirname(fileURLToPath(import.meta.url));
const skillsDir = resolve(currentDir, "../../../../.ai/skills");

function parseFrontmatter(content: string): { name?: string; description?: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  for (const line of match[1]!.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    fm[key] = value;
  }
  return { name: fm["name"], description: fm["description"] };
}

const listInputSchema = undefined;

export const listSkillsTool: McpTool<typeof listInputSchema> = {
  name: "list-skills",
  config: {
    title: "List Skills",
    description:
      "Lists all AI skills available in the .ai/skills/ directory with their name and description from frontmatter.",
  },
  executeCallback: () => {
    try {
      const files = readdirSync(skillsDir).filter((f) => f.endsWith(".md"));

      const skills = files.map((file) => {
        const content = readFileSync(resolve(skillsDir, file), "utf8");
        const { name, description } = parseFrontmatter(content);
        return {
          file,
          name: name ?? file.replace(".md", ""),
          description: description ?? "(no description)",
        };
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ totalSkills: skills.length, skills }, null, 2),
          },
        ],
      };
    } catch (error: unknown) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to list skills: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  },
};

const readInputSchema = {
  skillName: z
    .string()
    .describe(
      'Name of the skill to read — either the frontmatter name (e.g. "helios-to-carbon-orchestrator") or the filename without extension.'
    ),
};

export const readSkillTool: McpTool<typeof readInputSchema> = {
  name: "read-skill",
  config: {
    title: "Read Skill",
    description:
      "Returns the full markdown content of an AI skill from .ai/skills/. Use this to load skill instructions on demand.",
    inputSchema: readInputSchema,
  },
  executeCallback: ({ skillName }) => {
    try {
      const files = readdirSync(skillsDir).filter((f) => f.endsWith(".md"));

      // Match by frontmatter name or filename (with or without .md)
      const normalizedTarget = skillName.replace(/\.md$/, "");
      const match = files.find((file) => {
        if (file.replace(".md", "") === normalizedTarget) return true;
        const content = readFileSync(resolve(skillsDir, file), "utf8");
        const { name } = parseFrontmatter(content);
        return name === normalizedTarget;
      });

      if (!match) {
        const available = files.map((f) => f.replace(".md", "")).join(", ");
        return {
          content: [
            {
              type: "text",
              text: `Skill "${skillName}" not found. Available skills: ${available}`,
            },
          ],
          isError: true,
        };
      }

      const content = readFileSync(resolve(skillsDir, match), "utf8");
      return {
        content: [{ type: "text", text: content }],
      };
    } catch (error: unknown) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to read skill: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  },
};
