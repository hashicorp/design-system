/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { service } from '@ember/service';

import HdsButton from '../../button/index.gts';

import type HdsIntlService from '../../../../services/hds-intl.ts';

import type { HdsButtonSignature } from '../../button/index.gts';

export interface HdsFormKeyValueInputsAddRowButtonSignature {
  Args: {
    ariaLabel?: string;
    onClick?: () => void;
    text?: HdsButtonSignature['Args']['text'];
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsFormKeyValueInputsAddRowButton extends Component<HdsFormKeyValueInputsAddRowButtonSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  get ariaLabel(): string {
    return (
      this.args.ariaLabel ??
      this.hdsIntl.t(
        'hds.components.form.key-value-inputs.add-row-button.aria-label',
        {
          default: 'Add row',
        }
      )
    );
  }

  get text(): string {
    return (
      this.args.text ??
      this.hdsIntl.t(
        'hds.components.form.key-value-inputs.add-row-button.text',
        {
          default: 'Add row',
        }
      )
    );
  }

  onClick = (): void => {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick();
    }
  };

  <template>
    <HdsButton
      @text={{this.text}}
      @size="medium"
      @color="secondary"
      @icon="plus"
      @iconPosition="leading"
      class="hds-form-key-value-inputs__add-row-button"
      aria-description={{this.ariaLabel}}
      {{on "click" this.onClick}}
      ...attributes
    />
  </template>
}
