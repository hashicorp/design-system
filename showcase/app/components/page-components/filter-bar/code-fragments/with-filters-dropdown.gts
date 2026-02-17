/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFilterBarFiltersDropdown } from '@hashicorp/design-system-components/components';
import type { HdsFilterBarFilters } from '@hashicorp/design-system-components/components/hds/filter-bar/types';
import type { HdsFilterBarFiltersDropdownSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/filters-dropdown';

const EMPTY_FILTERS = {} as HdsFilterBarFilters;

export interface CodeFragmentWithFiltersDropdownSignature {
  Args: {
    isLiveFilter?: boolean;
    height?: string;
  };
  Element: HdsFilterBarFiltersDropdownSignature['Element'];
}

const CodeFragmentWithFiltersDropdown: TemplateOnlyComponent<CodeFragmentWithFiltersDropdownSignature> =
  <template>
    <HdsFilterBarFiltersDropdown
      @filters={{EMPTY_FILTERS}}
      @isLiveFilter={{@isLiveFilter}}
      @height={{@height}}
      as |D|
    >
      <D.FilterGroup
        @key="multi-select"
        @text="Multi-select"
        @type="multi-select"
        as |F|
      >
        <F.Checkbox @value="1" @label="Option 1" />
        <F.Checkbox @value="2" @label="Option 2" />
        <F.Checkbox @value="3" @label="Option 3" />
        <F.Checkbox @value="4" @label="Option 4" />
        <F.Checkbox @value="5" @label="Option 5" />
        <F.Checkbox @value="6" @label="Option 6" />
        <F.Checkbox @value="7" @label="Option 7" />
        <F.Checkbox @value="8" @label="Option 8" />
        <F.Checkbox @value="9" @label="Option 9" />
        <F.Checkbox @value="10" @label="Option 10" />
        <F.Checkbox @value="11" @label="Option 11" />
        <F.Checkbox @value="12" @label="Option 12" />
        <F.Checkbox @value="13" @label="Option 13" />
        <F.Checkbox @value="14" @label="Option 14" />
        <F.Checkbox @value="15" @label="Option 15" />
      </D.FilterGroup>
    </HdsFilterBarFiltersDropdown>
  </template>;

export default CodeFragmentWithFiltersDropdown;
