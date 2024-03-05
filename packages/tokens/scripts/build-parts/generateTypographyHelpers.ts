/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { TransformedTokens }  from 'style-dictionary';

import { PREFIX } from './generateCssHelpers';

type Helpers = string[];

export function generateTypographyHelpers(tokens: TransformedTokens, outputCssVars: boolean): Helpers {

    const helpers: Helpers = [];

    Object.keys(tokens).forEach((key: string) => {

        const declarations : string[] = [];

        if (key === 'font-stack') {

            const fontStackTokens = tokens[key];

            const selector = `.${PREFIX}-font`;
            if (fontStackTokens?.sans?.display) {
                const valueFontStackDisplay = outputCssVars ? 'var(--token-typography-font-stack-display)' : fontStackTokens.display.value;
                helpers.push(`${selector}-family-sans-display { font-family: ${valueFontStackDisplay}; }`);
            }
            if (fontStackTokens?.sans?.text) {
                const valueFontStackText = outputCssVars ? 'var(--token-typography-font-stack-text)' : fontStackTokens.text.value;
                helpers.push(`${selector}-family-sans-text { font-family: ${valueFontStackText}; }`);
            }
            if (fontStackTokens?.monospace?.code) {
                const valueFontStackCode = outputCssVars ? 'var(--token-typography-font-stack-code)' : fontStackTokens.code.value;
                helpers.push(`${selector}-family-mono-code { font-family: ${valueFontStackCode}; }`);
            }

        } else if (key === 'font-weight') {

            const fontWeightTokens = tokens[key];

            Object.keys(fontWeightTokens).forEach(weight => {
                const selector = `.${PREFIX}-font-weight-${weight}`;
                helpers.push(`${selector} { font-weight: ${fontWeightTokens[weight].value}; }`);
            });

        } else {

            let stylename = key;

            // basic font styles
            const valueFontFamily = outputCssVars ? `var(--token-typography-${stylename}-font-family)` : tokens[stylename]['font-family'].value;
            const valueFontSize = outputCssVars ? `var(--token-typography-${stylename}-font-size)` : tokens[stylename]['font-size'].value;
            const valueLineHeight = outputCssVars ? `var(--token-typography-${stylename}-line-height)` : tokens[stylename]['line-height'].value;
            declarations.push(`font-family: ${valueFontFamily};`);
            declarations.push(`font-size: ${valueFontSize};`);
            declarations.push(`line-height: ${valueLineHeight};`);

            // we reset margin/padding for all the text elements
            declarations.push('margin: 0;');
            declarations.push('padding: 0;');

            const selector = `.${PREFIX}-typography-${stylename}`;
            helpers.push(`${selector} { ${declarations.join(' ')} }`);
        }
    });

    return helpers;
}
