/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import style from 'ember-style-modifier';

export interface HdsFormSectionMultiFieldGroupItemSignature {
  Args: {
    width?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFormSectionMultiFieldGroupItem extends Component<HdsFormSectionMultiFieldGroupItemSignature> {
  get widthStyle(): Record<string, string> {
    const widthStyle: { [key: string]: string } = {};

    if (this.args.width) {
      widthStyle['--hds-form-section-multi-field-group-item-width'] =
        this.args.width;
    }
    return widthStyle;
  }

  <template>
    <div
      class="hds-form__section-multi-field-group-item"
      {{style this.widthStyle}}
      ...attributes
    >{{yield}}</div>
  </template>
}
