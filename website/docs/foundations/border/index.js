/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

/*
  --hds-border-radius-x-small: 3px;
  --hds-border-radius-small: 5px;
  --hds-border-radius-medium: 6px;
  --hds-border-radius-large: 8px;
*/

const RADII = ['x-small', 'small', 'medium', 'large'];

export default class Index extends Component {
  get cssVariables() {
    const cssVariables = { radii: [] };
    RADII.forEach((radius) => {
      cssVariables.radii.push(`--hds-border-radius-${radius}`);
    });
    return cssVariables;
  }
}
