/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(packageRoot, "src/catalogs/docs/catalog.json");
const outputPath = resolve(packageRoot, "dist/catalogs/docs/catalog.json");

await mkdir(dirname(outputPath), { recursive: true });
await copyFile(sourcePath, outputPath);
