/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';
import { on } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';

import DocFormLabel from 'website/components/doc/form/label';

interface DocFormSelectGroupTypeSignature {
  Args: {
    label: string;
    selectedValue: 'alphabetical' | 'category';
    onSelect: (event: Event) => void;
  };
  Element: HTMLDivElement;
}

class DocFormSelectGroupType extends Component<DocFormSelectGroupTypeSignature> {
  selectId = guidFor(this);

  <template>
    {{! TODO: Make a generic select then re-use for "GroupType" & "Size" selects }}
    <div class="doc-form-select" ...attributes>
      <DocFormLabel @for={{this.selectId}} @label={{@label}} />
      <select
        class="doc-form-select__control"
        id={{this.selectId}}
        {{on "change" @onSelect}}
      >
        <option
          value="alphabetical"
          selected={{eq @selectedValue "alphabetical"}}
        >Alphabetical</option>
        <option
          value="category"
          selected={{eq @selectedValue "category"}}
        >Category</option>
      </select>
    </div>
  </template>
}

export default DocFormSelectGroupType;
