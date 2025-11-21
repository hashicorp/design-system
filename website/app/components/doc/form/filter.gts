/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
import perform from 'ember-concurrency/helpers/perform';

import DocFormLabel from 'website/components/doc/form/label';

interface DocFormFilterSignature {
  Args: {
    label?: string;
    placeholder?: string;
    filterQuery?: string;
    onInput: (query: string) => void;
    isCompact?: boolean;
  };
  Element: HTMLInputElement;
}

export default class DocFormFilter extends Component<DocFormFilterSignature> {
  filterId = guidFor(this);

  <template>
    <div class="doc-form-filter {{if @isCompact 'doc-form-filter--compact'}}">
      {{#if @label}}
        <DocFormLabel @for={{this.filterId}} @label={{@label}} />
      {{/if}}
      <input
        type="search"
        name="filter"
        id={{this.filterId}}
        class="doc-form-filter__control"
        placeholder={{@placeholder}}
        aria-label={{@placeholder}}
        value={{@filterQuery}}
        {{! @glint-expect-error - TODO: fix this }}
        {{on "input" (perform @onInput value="target.value")}}
        ...attributes
      />
    </div>
  </template>
}
