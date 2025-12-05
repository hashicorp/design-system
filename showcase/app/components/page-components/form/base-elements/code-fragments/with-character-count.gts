/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import type Owner from '@ember/owner';

import { HdsFormCharacterCount } from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithCharacterCountSignature {
  Args: {
    value?: string;
    ariaLabel?: string;
    minLength?: number;
    maxLength?: number;
    customContent?: boolean;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithCharacterCount extends Component<CodeFragmentWithCharacterCountSignature> {
  @tracked value = '';
  uuid = guidFor(this);

  constructor(
    owner: Owner,
    args: CodeFragmentWithCharacterCountSignature['Args'],
  ) {
    super(owner, args);
    this.value = this.args.value ?? '';
  }

  updateValue = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.value = value;
  };

  <template>
    {{! template-lint-disable require-input-label }}
    <input
      type="text"
      aria-label={{@ariaLabel}}
      id={{this.uuid}}
      value={{this.value}}
      {{on "input" this.updateValue}}
    />
    {{#if @customContent}}
      <HdsFormCharacterCount
        @minLength={{@minLength}}
        @maxLength={{@maxLength}}
        @controlId={{this.uuid}}
        @value={{this.value}}
        as |CC|
      >
        maxLength={{CC.maxLength}}; minLength={{CC.minLength}}; remaining={{CC.remaining}};
        shortfall={{CC.shortfall}}; currentLength={{CC.currentLength}};
      </HdsFormCharacterCount>
    {{else}}
      <HdsFormCharacterCount
        @minLength={{@minLength}}
        @maxLength={{@maxLength}}
        @controlId={{this.uuid}}
        @value={{this.value}}
      />
    {{/if}}
    {{! template-lint-enable require-input-label }}
  </template>
}
