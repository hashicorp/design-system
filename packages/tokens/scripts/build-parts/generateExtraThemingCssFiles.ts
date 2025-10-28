/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';
import prettier from 'prettier';

import type { Dictionary, PlatformConfig }  from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

export async function generateExtraThemingCssFiles(_dictionary: Dictionary, config: PlatformConfig): Promise<void> {

  const commonSource = await getSourceFromFileWithRootSelector(config, 'hds', 'common-tokens.css');
  const hdsThemedSource = await getSourceFromFileWithRootSelector(config, 'hds', 'themed-tokens.css');
  const cds0ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g0', 'themed-tokens.css');
  const cds10ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g10', 'themed-tokens.css');
  const cds90ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g90', 'themed-tokens.css');
  const cds100ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g100', 'themed-tokens.css');

  const header = await fileHeader({});

  const methods = ['prefers-color-scheme', 'css-selectors', 'combined-strategies', 'scss-mixins'];

  for (const method of methods) {

    let outputContent = `${header}\n\n`;

    // CSS file for `prefers-color-scheme` (note: we use `cds-g0` for `light` and `cds-g100` for `dark`
    if (method === 'prefers-color-scheme') {
      outputContent = `${header}\n\n`;
      //
      // these are the themed `carbonized` tokens
      outputContent += `@media (prefers-color-scheme: light) { ${cds0ThemedSource} }\n\n`;
      outputContent += `@media (prefers-color-scheme: dark) { ${cds100ThemedSource} }\n\n`;
      //
      // this is the common part
      outputContent += `${commonSource}\n\n`;
    }

    // CSS file for `.class/[data]` selectors
    if (method === 'css-selectors') {
      outputContent = `${header}\n\n`;
      //
      // this is the fallback to the default `hds` mode
      outputContent += `${hdsThemedSource.replace(/^:root/, ':root, .hds-theme-hds, [data-hds-theme="hds"]')}\n\n`;
      //
      // these are the themed `carbonized` tokens
      outputContent += `${cds0ThemedSource.replace(/^:root/, '.hds-theme-light, .hds-theme-cds-g0, [data-hds-theme="light"], [data-hds-theme="cds-g0"]')}\n\n`;
      outputContent += `${cds10ThemedSource.replace(/^:root/, '.hds-theme-cds-g10, [data-hds-theme="cds-g10"]')}\n\n`;
      outputContent += `${cds90ThemedSource.replace(/^:root/, '.hds-theme-cds-g90, [data-hds-theme="cds-g90"]')}\n\n`;
      outputContent += `${cds100ThemedSource.replace(/^:root/, '.hds-theme-dark, .hds-theme-cds-g100, [data-hds-theme="dark"], [data-hds-theme="cds-g100"]')}\n\n`;
      //
      // this is the common part
      outputContent += `${commonSource}\n\n`;
    }

    // CSS file for combined `prefers-color-scheme` and CSS selectors in the same file
    if (method === 'combined-strategies') {
      outputContent = `${header}\n\n`;
      //
      // this is the fallback to the default `hds` mode
      outputContent += `${hdsThemedSource.replace(/^:root/, ':root, .hds-theme-hds, [data-hds-theme="hds"]')}\n\n`;
      //
      // these are the themed `carbonized` tokens
      // note: we will revisit the `[class*=hds-theme-]` selector if we find that is too generic and there are cases where this is picking up other classes
      outputContent += `@media (prefers-color-scheme: light) { ${cds0ThemedSource.replace(/^:root/, ':root:not([class*=hds-theme-]):not([data-hds-theme])')} }\n\n`;
      outputContent += `@media (prefers-color-scheme: dark) { ${cds100ThemedSource.replace(/^:root/, ':root:not([class*=hds-theme-]):not([data-hds-theme])')} }\n\n`;
      outputContent += `${cds0ThemedSource.replace(/^:root/, '.hds-theme-light, .hds-theme-cds-g0, [data-hds-theme="light"], [data-hds-theme="cds-g0"]')}\n\n`;
      outputContent += `${cds10ThemedSource.replace(/^:root/, '.hds-theme-cds-g10, [data-hds-theme="cds-g10"]')}\n\n`;
      outputContent += `${cds90ThemedSource.replace(/^:root/, '.hds-theme-cds-g90, [data-hds-theme="cds-g90"]')}\n\n`;
      outputContent += `${cds100ThemedSource.replace(/^:root/, '.hds-theme-dark, .hds-theme-cds-g100, [data-hds-theme="dark"], [data-hds-theme="cds-g100"]')}\n\n`;
      //
      // this is the common part
      outputContent += `${commonSource}\n\n`;
    }

    // SCSS file for mixins
    if (method === 'scss-mixins') {
      outputContent = `${header}\n\n`;
      outputContent += `@mixin hds-theme-hds() { ${hdsThemedSource} }\n\n`;
      outputContent += `@mixin hds-theme-cds0() { ${cds0ThemedSource} }\n\n`;
      outputContent += `@mixin hds-theme-cds10() { ${cds10ThemedSource} }\n\n`;
      outputContent += `@mixin hds-theme-cds90() { ${cds90ThemedSource} }\n\n`;
      outputContent += `@mixin hds-theme-cds100() { ${cds100ThemedSource} }\n\n`;
      //
      // this is the mixin that needs to be used to include the common tokens, shared across themes
      outputContent += `@mixin hds-theme-common() { ${commonSource} }\n\n`;
    }

    const outputTokensCss = await prettier.format(outputContent, { parser: 'css', tabWidth: 2, });

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
