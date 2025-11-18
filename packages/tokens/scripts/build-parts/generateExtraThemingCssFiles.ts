/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';
import prettier from 'prettier';

import type { Dictionary, PlatformConfig }  from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

export async function generateExtraThemingCssFiles(_dictionary: Dictionary, config: PlatformConfig): Promise<void> {

  const commonSource = await getSourceFromFileWithRootSelector(config, 'default', 'common-tokens.css');
  const defaultThemedSource = await getSourceFromFileWithRootSelector(config, 'default', 'themed-tokens.css');
  const cds0ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g0', 'themed-tokens.css');
  const cds10ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g10', 'themed-tokens.css');
  const cds90ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g90', 'themed-tokens.css');
  const cds100ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g100', 'themed-tokens.css');

  const header = await fileHeader({});

  const methods = ['css-selectors', 'css-selectors--migration', 'css-selectors--advanced', 'scss-mixins'];

  for (const method of methods) {

    let outputContent = `${header}\n\n`;

    // CSS file for combined `system/light/dark` themes in the same file (using `.class` selectors)
    if (method.startsWith('css-selectors')) {

      // this is the `:root`-only fallback if no theme is applied at all (we use the light/`cds-g0` mode)
      if (method === 'css-selectors') {
        outputContent += `${cds0ThemedSource}\n\n`;
      }
      // this is the `default` mode (standard HDS) - used for development (while migrating or in the showcase) but also as `:root`-only fallback fallback if no theme is applied at all
      if (method === 'css-selectors--migration' || method === 'css-selectors--advanced') {
        outputContent += `${defaultThemedSource.replace(/^:root/, ':root, .hds-theme-default')}\n\n`;
      }

      // these are the themed `carbonized` tokens
      outputContent += `@media (prefers-color-scheme: light) { ${cds0ThemedSource.replace(/^:root/, '.hds-theme-system')} }\n\n`;
      outputContent += `@media (prefers-color-scheme: dark) { ${cds100ThemedSource.replace(/^:root/, '.hds-theme-system')} }\n\n`;
      if (method === 'css-selectors' || method === 'css-selectors--migration') {
        // note: we use `cds-g0` for `light` and `cds-g100` for `dark`
        outputContent += `${cds0ThemedSource.replace(/^:root/, '.hds-theme-light')}\n\n`;
        outputContent += `${cds100ThemedSource.replace(/^:root/, '.hds-theme-dark')}\n\n`;
      }
      if (method === 'css-selectors--advanced') {
        // note: we use `cds-g0` for `light` and `cds-g100` for `dark`
        outputContent += `${cds0ThemedSource.replace(/^:root/, '.hds-theme-light, .hds-mode-cds-g0')}\n\n`;
        outputContent += `${cds100ThemedSource.replace(/^:root/, '.hds-theme-dark, .hds-mode-cds-g100')}\n\n`;
        // we write these _after_ the light/dark selectors so they can overwrite the previous declarations (they all have the same specificity)
        outputContent += `${cds10ThemedSource.replace(/^:root/, '.hds-mode-cds-g10')}\n\n`;
        outputContent += `${cds90ThemedSource.replace(/^:root/, '.hds-mode-cds-g90')}\n\n`;
      }

      // this is the common part
      outputContent += getCssVariablesStalenessComment();
      if (method === 'css-selectors') {
        outputContent += `${commonSource.replace(/^:root/, ':root, .hds-theme-system, .hds-theme-light, .hds-theme-dark')}\n\n`;
      }
      if (method === 'css-selectors--migration') {
        outputContent += `${commonSource.replace(/^:root/, ':root, .hds-theme-default, .hds-theme-system, .hds-theme-light, .hds-theme-dark')}\n\n`;
      }
      if (method === 'css-selectors--advanced') {
        outputContent += `${commonSource.replace(/^:root/, ':root, .hds-theme-default, .hds-theme-system, .hds-theme-light, .hds-theme-dark, .hds-mode-cds-g0, .hds-mode-cds-g10, .hds-mode-cds-g90, .hds-mode-cds-g100')}\n\n`;
      }
    }

    // SCSS file for mixins
    if (method === 'scss-mixins') {
      outputContent += `@mixin hds-theme-default() { ${defaultThemedSource} }\n\n`;
      outputContent += `@mixin hds-theme-light() { ${cds0ThemedSource} }\n\n`;
      outputContent += `@mixin hds-theme-dark() { ${cds100ThemedSource} }\n\n`;
      outputContent += `@mixin hds-mode-cds0() { ${cds0ThemedSource} }\n\n`;
      outputContent += `@mixin hds-mode-cds10() { ${cds10ThemedSource} }\n\n`;
      outputContent += `@mixin hds-mode-cds90() { ${cds90ThemedSource} }\n\n`;
      outputContent += `@mixin hds-mode-cds100() { ${cds100ThemedSource} }\n\n`;
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

function getCssVariablesStalenessComment(): string {
  let comment = '';
  comment += '\n/*\n\n';
  comment += 'WHY ARE ALL "COMPUTED" CSS VARIABLES REDECLARED IN EACH THEME SCOPE?\n';
  comment += '\n';
  comment += 'CSS custom properties (variables) inherit from parent to child, but when a variable is defined\n';
  comment += 'as a calculation or alias of another variable (e.g., `--alias-value: var(--source-value)`, its value is fixed\n';
  comment += 'at the scope where it is declared—using whatever is visible at that level in the DOM (eg. `:root`).\n';
  comment += '\n';
  comment += 'This block of "common/shared" CSS variables contains a lot of these aliases, so if we only declare these\n';
  comment += '"computed" variables at `:root` level, their values do not update in themed blocks that override\n';
  comment += 'the "source" variables (e.g., `--source-value`) at a lower scope.\n';
  comment += 'This results in _stale_ variables, where the computed value is always stuck on the `:root` value,\n';
  comment += 'even inside a themed block where the source variable is assigned.\n';
  comment += '\n';
  comment += 'To make sure every themed block/scoped context (eg. `.hds-theme-light`) correctly computes the aliased values,\n';
  comment += 'we redeclare each "computed" variable in every theme scope where its "source" variable is overridden.\n';
  comment += '\n*/\n\n';
  return comment;
}
