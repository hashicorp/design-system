#!/usr/bin/env node

import { existsSync } from 'node:fs';

const FILES_TO_CHECK = [
  'dist/styles/@hashicorp/design-system-components.css',
  'dist/styles/@hashicorp/design-system-power-select-overrides.css',
];

let hasErrors = false;

for (const file of FILES_TO_CHECK) {
  if (!existsSync(file)) {
    console.error(
      `\n\x1b[31m⚠️  Error: the pre-compiled CSS file \`${file}\` was not found\x1b[0m\n`
    );
    hasErrors = true;
  }
}

if (hasErrors) {
  process.exit(1);
}
