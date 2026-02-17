/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import HdsButton from '../../button/index.gts';

import type { HdsButtonSignature } from '../../button/index.gts';

export interface HdsFormKeyValueInputsAddRowButtonSignature {
  Args: {
    onClick?: () => void;
    text?: HdsButtonSignature['Args']['text'];
  };
  Element: HdsButtonSignature['Element'];
}

export default class HdsFormKeyValueInputsAddRowButton extends Component<HdsFormKeyValueInputsAddRowButtonSignature> {
  get text(): string {
    return this.args.text ?? 'Add row';
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
      aria-description="Adds a new row of one or more inputs at the end of the form field. Press shift tab to move focus back to the newly added row."
      {{on "click" this.onClick}}
      ...attributes
    />
  </template>
}
