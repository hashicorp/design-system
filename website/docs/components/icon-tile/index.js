/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import {
  SIZES,
  COLORS,
  PRODUCTS,
} from '@hashicorp/design-system-components/components/hds/icon-tile';

export default class Index extends Component {
  get SIZES() {
    return SIZES;
  }

  get COLORS() {
    return COLORS;
  }

  get PRODUCTS() {
    return PRODUCTS;
  }
}
