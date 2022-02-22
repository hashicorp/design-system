import { TransformedToken }  from 'style-dictionary';

import { PREFIX } from './generateCssHelpers';

type Helpers = string[];

export function generateColorHelpers(tokens: TransformedToken[]): Helpers {

    const helpers: Helpers = [];

    tokens.forEach(token => {

        if (!(token.attributes?.category === 'color')) return;

        const group = token.attributes.type || '';

        if (['foreground', 'page', 'surface', 'border'].includes(group)) {
            const context = token.path[1];
            const name = token.path[2];
            if (context === 'foreground') {
                helpers.push(`.${PREFIX}-${context}-${name} { color: var(--${token.name}); }`)
            }
            if (context === 'page' || context === 'surface') {
                helpers.push(`.${PREFIX}-${context}-${name} { background-color: var(--${token.name}); }`)
            }
            if (context === 'border') {
                // notice: we assume a 1px border (if a user needs a different border width, and want to use the helper, they have to apply an override)
                helpers.push(`.${PREFIX}-${context}-${name} { border: 1px solid var(--${token.name}); }`)
            }
        } else if (['hashicorp', 'hcp', 'boundary','consul','nomad','packer','terraform','vagrant','vault','waypoint'].includes(group)) {
            // TODO!
            // to be discussed if we want to expose all these colors as helpers
        } else if (group === 'palette') {
            // TODO!
            // do we want people to use palette colors directly as CSS helpers?
        } else if (['neutral', 'action', 'highlight', 'success', 'warning', 'critical'].includes(group)) {
            // THESE ARE THE OLD COLOR GROUPS, WE SKIP THEM
        } else {
            // show an error in case in the future we add new colors with a new grouping
            console.log(`ATTENTION: you need to add the color group "${group}" to the list of helpers`);
        }
    });

    return helpers;
}
