/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionTest from 'showcase/components/page-components/advanced-table/sub-sections/test';
// import SubSectionBaseElements from 'showcase/components/page-components/advanced-table/sub-sections/base-elements';
// import SubSectionBasic from 'showcase/components/page-components/advanced-table/sub-sections/basic';
// import SubSectionCustomization from 'showcase/components/page-components/advanced-table/sub-sections/customization';
// import SubSectionDemos from 'showcase/components/page-components/advanced-table/sub-sections/demos';
// import SubSectionFunctionalExamples from 'showcase/components/page-components/advanced-table/sub-sections/functional-examples';
// import SubSectionLayout from 'showcase/components/page-components/advanced-table/sub-sections/layout';
// import SubSectionMultiSelect from 'showcase/components/page-components/advanced-table/sub-sections/multi-select';
// import SubSectionNestedRows from 'showcase/components/page-components/advanced-table/sub-sections/nested-rows';
// import SubSectionOverflow from 'showcase/components/page-components/advanced-table/sub-sections/overflow';
// import SubSectionPinnableColumns from 'showcase/components/page-components/advanced-table/sub-sections/pinnable-column';
// import SubSectionReorderableColumns from 'showcase/components/page-components/advanced-table/sub-sections/reorderable-columns';
// import SubSectionResizableColumns from 'showcase/components/page-components/advanced-table/sub-sections/resizable-columns';
// import SubSectionSorting from 'showcase/components/page-components/advanced-table/sub-sections/sorting';
// import SubSectionTooltip from 'showcase/components/page-components/advanced-table/sub-sections/tooltip';

const AdvancedTableIndex: TemplateOnlyComponent = <template>
  {{pageTitle "AdvancedTable Component"}}

  <ShwTextH1>AdvancedTable</ShwTextH1>

  <section data-test-percy>
    <SubSectionTest />
    {{! <SubSectionBasic />
    <SubSectionNestedRows />
    <SubSectionOverflow />
    <SubSectionSorting />
    <SubSectionTooltip />
    <SubSectionMultiSelect />
    <SubSectionReorderableColumns />
    <SubSectionResizableColumns />
    <SubSectionPinnableColumns />
    <SubSectionFunctionalExamples />
    <SubSectionCustomization />
    <SubSectionLayout />
    <SubSectionDemos />
    <SubSectionBaseElements /> }}
  </section>
</template>;

export default AdvancedTableIndex;
