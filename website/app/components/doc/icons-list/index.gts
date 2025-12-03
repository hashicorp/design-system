/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import DocIconsListGrid from 'website/components/doc/icons-list/grid';
import DocFormFilter from 'website/components/doc/form/filter';
import DocFormSelect from 'website/components/doc/form/select';
import DocFormSelectGroupType from 'website/components/doc/form/select-group-type';
import type { CategoryIcon } from 'website/components/doc/icons-list/grid';

interface DocIconsListSignature {
  Args: {
    searchQuery: string;
    onSelectGroupType: (event: Event) => void;
    selectedGroupType: string;
    onSelectIconSize: (event: Event) => void;
    selectedIconSize: string;
    searchIcons: (query: string) => void;
    groupedIcons: Record<string, CategoryIcon[]>;
  };
}

const DocIconsList: TemplateOnlyComponent<DocIconsListSignature> = <template>
  <div class="doc-icons-list-filter">
    <DocFormFilter
      @label="Search"
      @placeholder="Type a name or keyword (e.g. arrow)"
      @filterQuery={{@searchQuery}}
      @onInput={{@searchIcons}}
      data-test="icons-filter"
      aria-describedby="icons-filter-description"
    />
    <span id="icons-filter-description" class="sr-only">Note: Icon list will
      automatically update as you type.</span>
    <DocFormSelectGroupType
      @label="Group by"
      @onSelect={{@onSelectGroupType}}
      @selectedValue={{@selectedGroupType}}
    />
    <DocFormSelect
      @label="Size"
      @onSelect={{@onSelectIconSize}}
      @selectedValue={{@selectedIconSize}}
    />
  </div>

  {{#each-in @groupedIcons as |categoryName categoryIcons|}}
    <DocIconsListGrid
      @categoryName={{categoryName}}
      @categoryIcons={{categoryIcons}}
    />
  {{else}}
    <p class="doc-text-body doc-icons-list-filter__not-found">No icons found. 🤷‍♀️</p>
  {{/each-in}}
</template>;

export default DocIconsList;
