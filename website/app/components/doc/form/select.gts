/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';

import DocFormLabel from 'website/components/doc/form/label';

interface DocFormSelectSignature {
  Args: {
    label: string;
    selectedValue: string;
    onSelect: (event: Event) => void;
  };
}

export default class DocFormSelect extends Component<DocFormSelectSignature> {
  selectId = guidFor(this);

  <template>
    <div class="doc-form-select">
      <DocFormLabel @for={{this.selectId}} @label={{@label}} />
      <select
        class="doc-form-select__control"
        id={{this.selectId}}
        {{on "change" @onSelect}}
      >
        <option value="16" selected={{eq @selectedValue "16"}}>16px</option>
        <option value="24" selected={{eq @selectedValue "24"}}>24px</option>
      </select>
    </div>
  </template>
}
