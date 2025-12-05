/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TransformedToken }  from 'style-dictionary';

import { PREFIX } from './generateCssHelpers.ts';

type Helpers = string[];

export function generateColorHelpers(tokens: TransformedToken[], outputCssVars: boolean): Helpers {

  const helpers: Helpers = [];

  tokens.forEach(token => {

    // ignore tokens that are not color-related
    if (!(token.path[0] === 'color')) return;

    // we know that color tokens have nested names, no need to test for its existence
    const group = token.path[1];
    const value = outputCssVars ? `var(--${token.name})` : token.$value;

    if (['foreground', 'page', 'surface', 'border'].includes(group)) {
      const name = token.path[2];
      if (group === 'foreground') {
        helpers.push(`.${PREFIX}-${group}-${name} { color: ${value}; }`)
      }
      if (group === 'page' || group === 'surface') {
        helpers.push(`.${PREFIX}-${group}-${name} { background-color: ${value}; }`)
      }
      if (group === 'border') {
        // notice: we assume a 1px border (if a user needs a different border width, and want to use the helper, they have to apply an override)
        helpers.push(`.${PREFIX}-${group}-${name} { border: 1px solid ${value}; }`)
      }
    } else if (['hashicorp', 'hcp', 'boundary','consul','nomad','packer','terraform','vagrant','vault','vault-secrets','vault-radar','waypoint'].includes(group)) {
      // TODO!
      // to be discussed if we want to expose all these colors as helpers
    } else if (group === 'palette') {
      // TODO!
      // do we want people to use palette colors directly as CSS helpers?
    } else if (group === 'focus') {
      // we don't want to expose them as helpers (they're related to a11y, so we don't want users to mess up with them)
    } else {
      // show an error in case in the future we add new colors with a new grouping
      console.log(`ATTENTION: you need to add the color group "${group}" to the list of helpers`);
    }
  });

  return helpers;
}
