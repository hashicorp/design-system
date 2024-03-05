/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { TransformedTokens }  from 'style-dictionary';

import { PREFIX } from './generateCssHelpers';

type Helpers = string[];

export function generateFocusRingHelpers(tokens: TransformedTokens, outputCssVars: boolean): Helpers {

    const helpersFocusRing: Helpers = [];

    Object.keys(tokens).forEach((key: string) => {
        const color = key;
        if (tokens[color].hasOwnProperty('box-shadow')) {
            const selector = `.${PREFIX}-focus-ring-${color}-box-shadow`;
            const value = outputCssVars ? `var(--token-focus-ring-${color}-box-shadow)` : tokens[color]['box-shadow'].value;
            helpersFocusRing.push(`${selector} { box-shadow: ${value}; }`);
        }
    });

    return [...helpersFocusRing];
}
