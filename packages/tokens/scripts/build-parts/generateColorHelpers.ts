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

    // note: as things stand now, we assume the name structure is always `[semantic]-color-[variant]`
    // if this changes in the future, we will have to update the logic below accordingly

    // ignore tokens that are not semantic and color-related
    if (!(token.group === 'semantic' && token.path[1] === 'color')) return;

    const category = token.path[0];
    const name = token.path[2];
    const value = outputCssVars ? `var(--${token.name})` : token.$value;

    if (category === 'foreground') {
      helpers.push(`.${PREFIX}-${category}-${name} { color: ${value}; }`)
    } else if (category === 'surface') {
      helpers.push(`.${PREFIX}-${category}-${name} { background-color: ${value}; }`)
    } else if (category === 'page') {
      helpers.push(`.${PREFIX}-${category}-${name} { background-color: ${value}; }`)
    } else if (category === 'border') {
      // notice: we assume a 1px border (if a user needs a different border width, and want to use the helper, they have to apply an override)
      helpers.push(`.${PREFIX}-${category}-${name} { border: 1px solid ${value}; }`)
    } else if (category === 'focus') {
      // we don't want to expose them as helpers (they're related to a11y, so we don't want users to mess up with them)
    } else {
      // show an error in case in the future we add new semantic colors with a new top-level category
      console.log(`ATTENTION: you need to add the color category "${category}" to the list of helpers`);
    }
  });

  return helpers;
}
