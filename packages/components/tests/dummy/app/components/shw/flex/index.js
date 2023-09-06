/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class FlexIndexComponent extends Component {
  direction = this.args.direction ?? 'row';

  get classNames() {
    let classes = ['shw-flex'];

    // add a class based on the @direction argument
    classes.push(`shw-flex--direction-${this.direction}`);

    // add a class based on the @wrap argument
    if (this.args.wrap) {
      classes.push('shw-flex--wrap');
    }

    return classes.join(' ');
  }
}
