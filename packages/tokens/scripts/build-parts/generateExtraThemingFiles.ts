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
    printWidth: 1000,
} as const;

export async function generateExtraThemingFiles(_dictionary: Dictionary, config: PlatformConfig ): Promise<void> {

    const darkSource = await fs.readFile(`${config.buildPath}themed-tokens/with-root-selector/dark-tokens.css`, 'utf8');
    const lightSource = await fs.readFile(`${config.buildPath}themed-tokens/with-root-selector/light-tokens.css`, 'utf8');
    const commonSource = await fs.readFile(`${config.buildPath}themed-tokens/with-root-selector/common-tokens.css`, 'utf8');

    const header = await fileHeader({});

    const methods = ['prefers-color-scheme', 'css-selectors', 'unified'];

    for (const method of methods) {

        const outputFolder = `${config.buildPath}themed-tokens/`;
        fs.ensureDir(outputFolder);

        let outputFilename;
        let outputContent = `${header}\n\n`;

        outputContent += `${commonSource}\n\n`;

        // this is the fallback to `light` mode (commented for now: consumers can always import the `themed-tokens/with-root-selector/light-tokens.css` as extra file if they want to)
        outputContent += `${lightSource}\n\n`;

        if (method === 'prefers-color-scheme') {
            outputFilename = 'with-prefers-color-scheme';
            outputContent += `@media (prefers-color-scheme: dark) { ${darkSource} }\n\n`;
            outputContent += `@media (prefers-color-scheme: light) { ${lightSource} }\n\n`;
        }
        if (method === 'css-selectors') {
            outputFilename = 'with-css-selectors';
            outputContent += `${darkSource.replace(/^:root/, '.hds-theme-dark, [data-hds-theme="dark"]')}\n\n`;
            outputContent += `${lightSource.replace(/^:root/, '.hds-theme-light, [data-hds-theme="light"]')}\n\n`;
        }
        if (method === 'unified') {
            outputFilename = 'unified';
            outputContent += `@media (prefers-color-scheme: dark) { ${darkSource.replace(/^:root/, ':root.hds-theme-auto, :root[data-hds-theme="auto"]')} }\n\n`;
            outputContent += `@media (prefers-color-scheme: light) { ${lightSource.replace(/^:root/, ':root.hds-theme-auto, :root[data-hds-theme="auto"]')} }\n\n`;
            outputContent += `${darkSource.replace(/^:root/, '.hds-theme-dark, [data-hds-theme="dark"]')}\n\n`;
            outputContent += `${lightSource.replace(/^:root/, '.hds-theme-light, [data-hds-theme="light"]')}\n\n`;
        }

        const outputTokensCss = await prettier.format(outputContent, prettierConfig);;
        await fs.writeFile(`${outputFolder}${outputFilename}.css`, outputTokensCss);
    }

}
