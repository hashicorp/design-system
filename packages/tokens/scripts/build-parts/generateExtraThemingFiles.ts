/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';
import prettier from 'prettier';

import type { Dictionary, PlatformConfig }  from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

const prettierConfig = {
    parser: 'css',
    tabWidth: 2,
} as const;

export async function generateExtraThemingFiles(_dictionary: Dictionary, config: PlatformConfig ): Promise<void> {

  const commonSource = await getSourceFromFileWithRootSelector(config, 'hds', 'common-tokens.css');
  const hdsThemedSource = await getSourceFromFileWithRootSelector(config, 'hds', 'themed-tokens.css');
  const cds0ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-0', 'themed-tokens.css');
  const cds10ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-10', 'themed-tokens.css');
  const cds90ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-90', 'themed-tokens.css');
  const cds100ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-100', 'themed-tokens.css');

  const header = await fileHeader({});

  const methods = ['prefers-color-scheme', 'css-selectors'];

  for (const method of methods) {

    let outputContent = `${header}\n\n`;

    // CSS files for `prefers-color-scheme` (note: we use `cds-0` for `light` and `
    if (method === 'prefers-color-scheme') {
      outputContent += `@media (prefers-color-scheme: dark) { ${cds0ThemedSource} }\n\n`;
      outputContent += `@media (prefers-color-scheme: light) { ${cds100ThemedSource} }\n\n`;
      // this is the fallback to `light` mode
      // commented for now: consumers can always import the `themed-tokens/with-root-selector/cds-0/themed-tokens.css` as extra file if they want to
      // outputContent += '\n\n';
      // outputContent += `${cds0ThemedSource}\n\n`;
    }

    // CSS files for `.class/[data]` selectors
    if (method === 'css-selectors') {
      outputContent = `${header}\n\n`;
      outputContent += `${hdsThemedSource.replace(/^:root/, '.hds-theme-default, [data-hds-theme="default"]')}\n\n`;
      outputContent += `${cds0ThemedSource.replace(/^:root/, '.hds-theme-cds-0, [data-hds-theme="cds-0"]')}\n\n`;
      outputContent += `${cds10ThemedSource.replace(/^:root/, '.hds-theme-cds-10, [data-hds-theme="cds-10"]')}\n\n`;
      outputContent += `${cds90ThemedSource.replace(/^:root/, '.hds-theme-cds-90, [data-hds-theme="cds-90"]')}\n\n`;
      outputContent += `${cds100ThemedSource.replace(/^:root/, '.hds-theme-cds-100, [data-hds-theme="cds-100"]')}\n\n`;
      // this is the fallback to the default `hds` mode
      outputContent += '\n\n';
      outputContent += `${hdsThemedSource}\n\n`;
    }

    outputContent += `${commonSource}\n\n`;

    const outputTokensCss = await prettier.format(outputContent, prettierConfig);

    const outputFolder = `${config.buildPath}themed-tokens/with-${method}/`;
    await fs.ensureDir(outputFolder);
    await fs.writeFile(`${outputFolder}tokens.css`, outputTokensCss);
  }
}

async function getSourceFromFileWithRootSelector(config: PlatformConfig, theme: string, path: string): Promise<string> {

  const rawSource = await fs.readFile(`${config.buildPath}themed-tokens/with-root-selector/${theme}/${path}`, 'utf8');
  const header = await fileHeader({});
  return rawSource.replace(header, '');
}