/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class DocCardsCardComponent extends Component {
  get classNames() {
    let classes = ['doc-cards-card'];
    let layout = this.args.layout ?? 'vertical';

    // add a class based on the @layout argument, default = 'vertical'
    classes.push(`doc-cards-card--layout-${layout}`);

    return classes.join(' ');
  }
}
