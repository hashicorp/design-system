/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElements from 'showcase/components/page-components/table/sub-sections/base-elements';
import SubSectionCustomization from 'showcase/components/page-components/table/sub-sections/customization';
import SubSectionDataModel from 'showcase/components/page-components/table/sub-sections/data-model';
import SubSectionLayout from 'showcase/components/page-components/table/sub-sections/layout';
import SubSectionMultiSelect from 'showcase/components/page-components/table/sub-sections/multi-select';
import SubSectionSorting from 'showcase/components/page-components/table/sub-sections/sorting';
import SubSectionTooltip from 'showcase/components/page-components/table/sub-sections/tooltip';

const TableIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Table Component"}}

  <ShwTextH1>Table</ShwTextH1>

  <section data-test-percy>
    <SubSectionDataModel />
    <SubSectionSorting />
    <SubSectionTooltip />
    <SubSectionMultiSelect />
    <SubSectionCustomization />
    <SubSectionLayout />
    <SubSectionBaseElements />
  </section>
</template>;

export default TableIndex;
