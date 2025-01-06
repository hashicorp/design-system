/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

const BORDERS = ['x-small', 'small', 'medium', 'large'];

export default class Index extends Component {
  get cssVariables() {
    const cssVariables = { borders: [] };
    BORDERS.forEach((border) => {
      cssVariables.borders.push(`--token-border-${border}`);
    });
    return cssVariables;
  }
}
