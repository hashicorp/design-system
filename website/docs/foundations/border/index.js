/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

/*
  --token-border-radius-x-small: 3px;
  --token-border-radius-small: 5px;
  --token-border-radius-medium: 6px;
  --token-border-radius-large: 8px;
*/

const RADII = ['x-small', 'small', 'medium', 'large'];

export default class Index extends Component {
  get cssVariables() {
    const cssVariables = { radii: [] };
    RADII.forEach((radius) => {
      cssVariables.radii.push(`--token-border-radius-${radius}`);
    });
    return cssVariables;
  }
}
