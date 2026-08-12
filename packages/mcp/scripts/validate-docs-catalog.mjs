/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { z } from "zod";

const scopes = ["about", "components", "content", "foundations", "patterns"];
const sectionSchema = z.object({
  id: z.string().min(1),
  heading: z.string().min(1),
  anchor: z.string(),
  tab: z.string().optional(),
  markdown: z.string(),
});
const catalogSchema = z.object({
  version: z.literal(1),
  pages: z.array(
    z.object({
      id: z.string().min(1),
      url: z.string().startsWith("/"),
      title: z.string().min(1),
      description: z.string().optional(),
      caption: z.string().optional(),
      keywords: z.array(z.string()),
      scope: z.enum(scopes),
      sections: z.array(sectionSchema),
    }),
  ),
});

export const validateDocsCatalog = (catalog) => catalogSchema.parse(catalog);

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const catalogPath = resolve(packageRoot, "src/catalogs/docs/catalog.json");
  const catalog = JSON.parse(await readFile(catalogPath, "utf8"));

  validateDocsCatalog(catalog);
}
