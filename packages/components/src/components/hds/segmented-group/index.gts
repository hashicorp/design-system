/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import style from 'ember-style-modifier';

import HdsButton from '../button/index.gts';
import HdsDropdown from '../dropdown/index.gts';
import HdsFormSelectBase from '../form/select/base.gts';
import HdsFormTextInputBase from '../form/text-input/base.gts';
import HdsFormSuperSelectSingleBase from '../form/super-select/single/base.gts';
import HdsFormSuperSelectMultipleBase from '../form/super-select/multiple/base.gts';
import HdsYield from '../yield/index.gts';

export interface HdsSegmentedGroupSignature {
  Args: {
    isFullWidth?: boolean;
    maxWidth?: string;
  };
  Blocks: {
    default: [
      {
        Button?: typeof HdsButton;
        Dropdown?: typeof HdsDropdown;
        Select?: typeof HdsFormSelectBase;
        TextInput?: typeof HdsFormTextInputBase;
        SuperSelectSingle?: typeof HdsFormSuperSelectSingleBase;
        SuperSelectMultiple?: typeof HdsFormSuperSelectMultipleBase;
        Generic?: typeof HdsYield;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsSegmentedGroup extends Component<HdsSegmentedGroupSignature> {
  get classNames() {
    const classes = ['hds-segmented-group'];

    if (this.args.isFullWidth) {
      classes.push('hds-segmented-group--is-full-width');
    }

    return classes.join(' ');
  }

  get styles(): Record<string, string> {
    const styles: { [key: string]: string } = {};
    if (this.args.maxWidth) {
      styles['--hds-segmented-group-max-width'] = this.args.maxWidth;
    }

    return styles;
  }

  <template>
    <div class={{this.classNames}} {{style this.styles}} ...attributes>
      {{yield
        (hash
          Button=HdsButton
          Dropdown=HdsDropdown
          Select=HdsFormSelectBase
          TextInput=HdsFormTextInputBase
          SuperSelectSingle=HdsFormSuperSelectSingleBase
          SuperSelectMultiple=HdsFormSuperSelectMultipleBase
          Generic=HdsYield
        )
      }}
    </div>
  </template>
}
