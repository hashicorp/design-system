/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';
import prettier from 'prettier';

import type { Dictionary, PlatformConfig }  from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

import { getSourceFromFileWithRootSelector } from './getSourceFromFileWithRootSelector.ts';

export async function generateThemingCssFiles(_dictionary: Dictionary, config: PlatformConfig): Promise<void> {

  const commonSource = await getSourceFromFileWithRootSelector(config, 'default', 'common-tokens.css');
  const defaultThemedSource = await getSourceFromFileWithRootSelector(config, 'default', 'themed-tokens.css');
  const cds0ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g0', 'themed-tokens.css');
  const cds10ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g10', 'themed-tokens.css');
  const cds90ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g90', 'themed-tokens.css');
  const cds100ThemedSource = await getSourceFromFileWithRootSelector(config, 'cds-g100', 'themed-tokens.css');

  const header = await fileHeader({});

  // for the moment we're covering only the use cases we know of, later we may add more formats if needed
  const methods = ['css-selectors', 'css-selectors--migration', 'css-selectors--advanced', 'scss-mixins'];

  for (const method of methods) {

    let outputContent = `${header}\n\n`;

    // CSS file for combined `system/light/dark` themes in the same file (using `.class` selectors)
    if (method.startsWith('css-selectors')) {

      // emit the `color-scheme` declarations up-front, so native UI (scrollbars, form controls, etc.) matches the active theme/mode
      // note: the `--migration`/`--advanced` formats also output the `.hds-theme-default` tokens, so we declare its scheme too
      // note: the `--advanced` format also exposes the explicit `.hds-mode-cds-*` selectors, so we declare their scheme too
      const colorSchemeSelectors = [':root', '.hds-theme-system', '.hds-theme-light', '.hds-theme-dark'];
      if (method === 'css-selectors--migration' || method === 'css-selectors--advanced') {
        colorSchemeSelectors.push('.hds-theme-default');
      }
      if (method === 'css-selectors--advanced') {
        colorSchemeSelectors.push('.hds-mode-cds-g0', '.hds-mode-cds-g10', '.hds-mode-cds-g90', '.hds-mode-cds-g100');
      }
      outputContent += getColorSchemeDeclarations(colorSchemeSelectors);

      // add an intro comment for the tokens that acts as a separator
      outputContent += getDesignTokensIntroComment();

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
      // these are the mixins that can be used to include the "themed" tokens
      // note: each themed mixin also injects a matching `color-scheme` (so native UI follows the theme/mode), while the `default` mixin is left as-is
      outputContent += `@mixin hds-theme-default() { ${defaultThemedSource} }\n\n`;
      outputContent += `@mixin hds-theme-light() { ${withColorScheme(cds0ThemedSource, 'light')} }\n\n`;
      outputContent += `@mixin hds-theme-dark() { ${withColorScheme(cds100ThemedSource, 'dark')} }\n\n`;
      outputContent += `@mixin hds-mode-cds0() { ${withColorScheme(cds0ThemedSource, 'light')} }\n\n`;
      outputContent += `@mixin hds-mode-cds10() { ${withColorScheme(cds10ThemedSource, 'light')} }\n\n`;
      outputContent += `@mixin hds-mode-cds90() { ${withColorScheme(cds90ThemedSource, 'dark')} }\n\n`;
      outputContent += `@mixin hds-mode-cds100() { ${withColorScheme(cds100ThemedSource, 'dark')} }\n\n`;

      // this is the mixin that needs to be used to include the common tokens, shared across themes
      outputContent += `@mixin hds-theme-common() { ${commonSource} }\n\n`;
    }

    const outputTokensCss = await prettier.format(outputContent, { parser: 'scss', tabWidth: 2, });

    const outputFolder = `${config.buildPath}themed-tokens/with-${method}/`;
    await fs.ensureDir(outputFolder);
    await fs.writeFile(`${outputFolder}tokens.css`, outputTokensCss);
  }
}

// injects a `color-scheme` declaration as the first property inside the leading `:root` block of a source (used by the SCSS "mixins" format)
function withColorScheme(source: string, value: string): string {
  return source.replace(/^:root\s*{/, `:root {\n  color-scheme: ${value};\n`);
}

// the `color-scheme` value to use for each theme/mode selector
const COLOR_SCHEME_BY_SELECTOR: Record<string, string> = {
  // the `:root` fallback tokens are always light (`cds-g0`/HDS default), so force `light` to keep native controls in sync
  ':root': 'light',
  // the `default` theme uses the (light) standard HDS tokens, so force `light` to match
  '.hds-theme-default': 'light',
  // declare support for both schemes, so native controls resolve via the OS `prefers-color-scheme` setting automatically
  '.hds-theme-system': 'light dark',
  // force light/dark-rendered native controls, so they match the explicitly chosen theme
  '.hds-theme-light': 'light',
  '.hds-theme-dark': 'dark',
  // align each Carbon mode with its lightness
  '.hds-mode-cds-g0': 'light',
  '.hds-mode-cds-g10': 'light',
  '.hds-mode-cds-g90': 'dark',
  '.hds-mode-cds-g100': 'dark',
};

// builds a block of standalone `color-scheme` rules for the given selectors
function getColorSchemeDeclarations(selectors: string[]): string {
  let comment = '';
  comment += '\n/*\n\n';
  comment += 'COLOR SCHEMES\n';
  comment += '\n';
  comment += 'These `color-scheme` declarations make native UI (scrollbars, form controls, etc.) adapt to the active theme/mode.\n';
  comment += '\n';
  comment += 'Known platform limitations: some OS-drawn widgets (eg. the native `<select>` popup on macOS) always follow the OS appearance, regardless of `color-scheme`.\n';
  comment += 'With `.hds-theme-system` this matches (it defers to the OS anyway), but `.hds-theme-light`/`.hds-theme-dark` color schemes are ignored for these widgets.\n';
  comment += 'This is by "CSS Color Adjustment Module Level 1" specs (the scheme is "negotiated" with the OS) and cannot be controlled via CSS; everything else adapts correctly.\n';
  comment += '\n*/\n';

  let code = '';
  for (const selector of selectors) {
    code += `${selector} { color-scheme: ${COLOR_SCHEME_BY_SELECTOR[selector]}; }\n`;
  }

  return `${comment}\n${code}\n`;
}

function getDesignTokensIntroComment(): string {
  let comment = '';
  comment += '\n/*\n\n';
  comment += 'DESIGN TOKENS (CSS VARIABLES) FOR THE DIFFERENT THEMES/MODES\n';
  comment += '\n';
  comment += 'The declarations below define the value of each design token (CSS variable) for every theme/mode,\n';
  comment += 'scoped to its corresponding `:root`/`.hds-theme-*`/`.hds-mode-*` selector.\n';
  comment += '\n*/\n';

  return `${comment}\n`;
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
