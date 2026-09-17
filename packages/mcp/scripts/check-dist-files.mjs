#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { existsSync } from 'node:fs';

const FILES_TO_CHECK = ['dist/index.js'];

for (const file of FILES_TO_CHECK) {
  if (existsSync(file) === false) {
    console.error(`Required package file \`${file}\` was not found`);
    process.exitCode = 1;
  }
}
