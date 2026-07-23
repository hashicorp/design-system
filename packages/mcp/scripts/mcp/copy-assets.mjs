/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const assets = [
  {
    source: resolve(packageRoot, "src/catalogs/code-examples/catalog.json"),
    output: resolve(packageRoot, "dist/catalogs/code-examples/catalog.json"),
  },
];

for (const { source, output } of assets) {
  await mkdir(dirname(output), { recursive: true });
  await copyFile(source, output);
}
