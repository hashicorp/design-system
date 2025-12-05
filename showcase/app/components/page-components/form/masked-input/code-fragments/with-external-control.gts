/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import {
  HdsFormMaskedInputBase,
  HdsFormCheckboxField,
} from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithExternalControlSignature {
  Element: HTMLDivElement;
}

export default class CodeFragmentWithExternalControl extends Component<CodeFragmentWithExternalControlSignature> {
  @tracked isContentMasked = true;

  updateIsContentMasked = () => {
    this.isContentMasked = !this.isContentMasked;
  };

  <template>
    <div class="shw-component-form-masked-input-controls">
      <HdsFormCheckboxField
        name="toggle-visibility"
        checked={{this.isContentMasked}}
        {{on "change" this.updateIsContentMasked}}
        as |F|
      >
        <F.Label>Content masking:
          {{if this.isContentMasked "Enabled" "Disabled"}}</F.Label>
      </HdsFormCheckboxField>
    </div>
    <HdsFormMaskedInputBase
      @isContentMasked={{this.isContentMasked}}
      @value="Lorem ipsum dolor"
      aria-label="Externally controlled"
    />
  </template>
}
