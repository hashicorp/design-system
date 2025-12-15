/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

interface DocDoDontSignature {
  Args: {
    type: 'do' | 'dont';
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocDoDont extends Component<DocDoDontSignature> {
  get label() {
    let label;
    switch (this.args.type) {
      case 'do':
        label = 'Do';
        break;
      case 'dont':
        label = 'Don’t';
        break;
      default:
        break;
    }
    return label;
  }

  get classNames() {
    const classes = ['doc-do-dont'];

    classes.push(`doc-do-dont--type-${this.args.type}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      <div class="doc-do-dont__badge">{{this.label}}</div>
      <div class="doc-do-dont__content">
        {{yield}}
      </div>
    </div>
  </template>
}
