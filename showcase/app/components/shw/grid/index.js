/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class GridIndexComponent extends Component {
  get columns() {
    let { columns } = this.args;

    assert('@columns for "Shw::Grid" must be defined', columns !== undefined);

    return columns;
  }

  get classNames() {
    let classes = ['shw-grid'];

    // add a class based on the @columns argument
    classes.push(`shw-grid--cols-${this.columns}`);

    return classes.join(' ');
  }
}
