import { TransformedTokens }  from 'style-dictionary';

import { PREFIX } from './generateCssHelpers';

type Helpers = string[];

export function generateFocusRingHelpers(tokens: TransformedTokens): Helpers {

    const helpersFocusRing: Helpers = [];

    Object.keys(tokens).forEach((key: string) => {
        const color = key;
        if (tokens[color].hasOwnProperty('box-shadow')) {
            const selector = `.${PREFIX}-focus-ring-${color}-box-shadow`;
            helpersFocusRing.push(`${selector} { box-shadow: var(--token-focus-ring-${color}-box-shadow); }`);
        }
    });

    return [...helpersFocusRing];
}
