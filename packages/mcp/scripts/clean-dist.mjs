/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/* global URL */
const distPath = fileURLToPath(new URL('../dist', import.meta.url));

await rm(distPath, {
  recursive: true,
  force: true,
});
