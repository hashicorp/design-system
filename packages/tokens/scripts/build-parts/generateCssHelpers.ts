/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';

import { Dictionary, Platform }  from 'style-dictionary';

import { generateColorHelpers } from './generateColorHelpers';
import { generateTypographyHelpers } from './generateTypographyHelpers';
import { generateElevationHelpers } from './generateElevationHelpers';
import { generateFocusRingHelpers } from './generateFocusRingHelpers';

export const PREFIX = 'hds';

export async function generateCssHelpers(dictionary: Dictionary, config: Platform ): Promise<void> {

    fs.ensureDir(`${config.buildPath}helpers/`);

    // tried to use style-dictionary/lib/common/formatHelpers/fileHeader.js but didn't work
    const header = `/**\n * Do not edit directly\n * Generated on ${new Date().toUTCString()}\n */\n`;

    // unfortunately there's no way to pass arguments/parameters to the actions
    // so we need to use the `config` to detect which transformGroup is running
    // and depending on it output CSS variables or not (they're not supported in emails)
    const outputCssVars = config.transformGroup !== 'products/email';

    if (dictionary.tokens.color) {
        // notice: the "color" tokens have different structure depending on the type
        // so it's simpler to process all the tokens (flat structure) and filter them
        const helpers = generateColorHelpers(dictionary.allTokens, outputCssVars);
        const content = `${header}\n${helpers.join('\n')}\n`;
        await fs.writeFile(`${config.buildPath}helpers/color.css`, content);
    }

    if (dictionary.tokens.typography) {
        const helpers = generateTypographyHelpers(dictionary.tokens.typography, outputCssVars);
        const content = `${header}\n${helpers.join('\n')}\n`;
        await fs.writeFile(`${config.buildPath}helpers/typography.css`, content);
    }

    if (dictionary.tokens.elevation) {
        const helpers = generateElevationHelpers(dictionary.tokens.elevation, dictionary.tokens.surface, outputCssVars);
        const content = `${header}\n${helpers.join('\n')}\n`;
        await fs.writeFile(`${config.buildPath}helpers/elevation.css`, content);
    }

    if (dictionary.tokens['focus-ring']) {
        const helpers = generateFocusRingHelpers(dictionary.tokens['focus-ring'], outputCssVars);
        const content = `${header}\n${helpers.join('\n')}\n`;
        await fs.writeFile(`${config.buildPath}helpers/focus-ring.css`, content);
    }
}
