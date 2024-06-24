/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class FlexIndexComponent extends Component {
  direction = this.args.direction ?? 'row';

  get itemsStyle() {
    let styles = [];
    if (this.args.gap) {
      styles.push(`gap: ${this.args.gap}`);
    }

    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }

  get classNames() {
    let classes = ['shw-flex'];

    // add a class based on the @direction argument
    classes.push(`shw-flex--direction-${this.direction}`);

    return classes.join(' ');
  }
}
