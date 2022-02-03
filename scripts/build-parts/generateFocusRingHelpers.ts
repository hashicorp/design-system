import { TransformedTokens }  from 'style-dictionary';

import { PREFIX } from './generateCssHelpers';

type Helpers = string[];

export function generateFocusRingHelpers(tokens: TransformedTokens): Helpers {

    // notice: even if the focus-ring case is much simpler than the other helpers I have
    // maintained the same code structure for consistency so it's easier to compare and refactor if needed

    const helpersFocusRing: Helpers = [];

    if (tokens.hasOwnProperty('box-shadow')) {
        const selector = `.${PREFIX}-focus-ring-box-shadow`;
        helpersFocusRing.push(`${selector} { box-shadow: var(--token-focus-ring-box-shadow); }`);
    }

    return [...helpersFocusRing];
}
