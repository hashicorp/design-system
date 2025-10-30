/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { fn } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';

import { HdsFormSuperSelectMultipleBase } from '@hashicorp/design-system-components/components';

import type { HdsFormSuperSelectMultipleBaseSignature } from '@hashicorp/design-system-components/components/hds/form/super-select/multiple/base';

const OPTIONS = ['Option 1'];

export interface CodeFragmentWithMultipleBaseElementSignature {
  Args: {
    placeholder?: HdsFormSuperSelectMultipleBaseSignature['Args']['placeholder'];
    isSelected?: boolean;
    options?: string;
  };
  Element: HdsFormSuperSelectMultipleBaseSignature['Element'];
}

export default class CodeFragmentWithMultipleBaseElement extends Component<CodeFragmentWithMultipleBaseElementSignature> {
  @tracked selectedOptions: string[] = [];

  options = OPTIONS;

  constructor(
    owner: Owner,
    args: CodeFragmentWithMultipleBaseElementSignature['Args'],
  ) {
    super(owner, args);
  }

  <template>
    <HdsFormSuperSelectMultipleBase
      @onChange={{fn (mut this.selectedOptions)}}
      @options={{this.options}}
      @selected={{this.selectedOptions}}
      @placeholder={{@placeholder}}
      @showAfterOptions={{true}}
      @ariaLabel="Label"
      ...attributes
      as |option|
    >
      {{option}}
    </HdsFormSuperSelectMultipleBase>
  </template>
}
