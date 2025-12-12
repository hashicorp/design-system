/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/filter-bar/sub-sections/content';
import SubSectionDemos from 'showcase/components/page-components/filter-bar/sub-sections/demos';
import SubSectionBaseElements from 'showcase/components/page-components/filter-bar/sub-sections/base-elements';

const FilterBarIndex: TemplateOnlyComponent = <template>
  {{pageTitle "FilterBar Component"}}

  <ShwTextH1>FilterBar</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionDemos />
    <SubSectionBaseElements />
  </section>
</template>;

export default FilterBarIndex;
