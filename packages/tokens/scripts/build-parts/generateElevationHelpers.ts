import { TransformedTokens }  from 'style-dictionary';

import { PREFIX } from './generateCssHelpers';

type Helpers = string[];

export function generateElevationHelpers(tokensElevation: TransformedTokens, tokensSurface: TransformedTokens): Helpers {

    const helpersElevation: Helpers = [];
    const helpersSurface: Helpers = [];

    Object.keys(tokensElevation).forEach((key: string) => {

        // we define shared colors under a JSON block in the "elevation" namespace
        if (key === 'color') return;

        const levelName = key;
        const levelValues = tokensElevation[key];

        if (levelValues.hasOwnProperty('box-shadow')) {
            const selector = `.${PREFIX}-elevation-${levelName}`;
            helpersElevation.push(`${selector} { box-shadow: var(--token-elevation-${levelName}-box-shadow); }`);
        }
    });

    Object.keys(tokensSurface).forEach((key: string) => {

        const levelName = key;
        const levelValues = tokensSurface[key];

        if (levelValues.hasOwnProperty('box-shadow')) {
            const selector = `.${PREFIX}-surface-${levelName}`;
            helpersSurface.push(`${selector} { box-shadow: var(--token-surface-${levelName}-box-shadow); }`);
        }
    });

    return [...helpersElevation, ...helpersSurface];
}
