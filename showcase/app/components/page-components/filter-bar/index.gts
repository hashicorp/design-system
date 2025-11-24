/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBasic from 'showcase/components/page-components/filter-bar/sub-sections/basic';

const FilterBarIndex: TemplateOnlyComponent = <template>
  {{pageTitle "FilterBar Component"}}

  <ShwTextH1>Filter Bar</ShwTextH1>

  <section data-test-percy>
    <SubSectionBasic />
  </section>
</template>;

export default FilterBarIndex;
