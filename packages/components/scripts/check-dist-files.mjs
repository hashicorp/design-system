#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { existsSync, readFileSync } from 'node:fs';

const FILES_TO_CHECK = [
  'dist/styles/@hashicorp/design-system-components.css',
  'dist/styles/@hashicorp/design-system-components-common.css',
  'dist/styles/@hashicorp/design-system-power-select-overrides.css',
  'dist/styles/@hashicorp/design-system-plex-fonts.css',
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

// each `app-js` entry re-exports a module's default export into the app, so the
// module has to have one (helper modules next to a component don't)
const appJs = JSON.parse(readFileSync('package.json', 'utf8'))['ember-addon'][
  'app-js'
];
for (const [appPath, reexportFile] of Object.entries(appJs)) {
  const [, target] =
    readFileSync(reexportFile, 'utf8').match(
      /from ['"]@hashicorp\/design-system-components\/([^'"]+)['"]/
    ) ?? [];
  const targetFile = target && `dist/${target.replace(/(\.js)?$/, '.js')}`;
  if (
    !targetFile ||
    !existsSync(targetFile) ||
    !/export default|as default\b/.test(readFileSync(targetFile, 'utf8'))
  ) {
    console.error(
      `\n\x1b[31m⚠️  Error: \`${appPath}\` is re-exported into the app, but \`${targetFile ?? reexportFile}\` has no default export\x1b[0m\n`
    );
    hasErrors = true;
  }
}

if (hasErrors) {
  process.exit(1);
}
