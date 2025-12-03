/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';

import CodeFragmentWithGenericContent from 'showcase/components/page-components/filter-bar/code-fragments/with-generic-content';

const APPLIED_FILTER_TYPES = ['single-select', 'multi-select', 'numerical', 'date', 'time', 'datetime', 'generic', 'search'];

const SubSectionAppliedFilters: TemplateOnlyComponent = <template>
  <ShwTextH2>Applied filters</ShwTextH2>

  <ShwTextH3>Types</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    {{#each APPLIED_FILTER_TYPES as |type|}}
      <SF.Item as |SFI|>
        <SFI.Label>{{type}}</SFI.Label>
        <CodeFragmentWithGenericContent @appliedFiltersType={{type}} @hasSearch={{eq type "search"}} />
      </SF.Item>
    {{/each}}
  </ShwFlex>
  <ShwDivider />
</template>

export default SubSectionAppliedFilters;
