import { TransformedTokens }  from 'style-dictionary';

import { PREFIX } from './generateCssHelpers';

type Helpers = string[];

export function generateTypographyHelpers(tokens: TransformedTokens): Helpers {

    const helpers: Helpers = [];

    Object.keys(tokens).forEach((key: string) => {

        const declarations : string[] = [];

        if (key === 'font-stack') {

            const fontStackTokens = tokens[key];

            const selector = `.${PREFIX}-font`;
            if (fontStackTokens?.sans?.display) {
                helpers.push(`${selector}-family-sans-display { font-family: var(--token-typography-font-stack-display); }`);
            }
            if (fontStackTokens?.sans?.text) {
                helpers.push(`${selector}-family-sans-text { font-family: var(--token-typography-font-stack-text); }`);
            }
            if (fontStackTokens?.monospace?.code) {
                helpers.push(`${selector}-family-mono-code { font-family: var(--token-typography-font-stack-code); }`);
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
            declarations.push(`font-family: var(--token-typography-${stylename}-font-family);`);
            declarations.push(`font-size: var(--token-typography-${stylename}-font-size);`);
            declarations.push(`line-height: var(--token-typography-${stylename}-line-height);`);

            // we reset margin/padding for all the text elements
            declarations.push('margin: 0;');
            declarations.push('padding: 0;');

            const selector = `.${PREFIX}-typography-${stylename}`;
            helpers.push(`${selector} { ${declarations.join(' ')} }`);
        }
    });

    return helpers;
}
