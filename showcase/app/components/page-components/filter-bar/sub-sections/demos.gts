/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFrame from 'showcase/components/shw/frame';

import CodeFragmentWithComplexTable from 'showcase/components/page-components/filter-bar/code-fragments/with-complex-table';
import CodeFragmentWithTable from 'showcase/components/page-components/filter-bar/code-fragments/with-table';
import CodeFragmentWithGenericFilters from 'showcase/components/page-components/filter-bar/code-fragments/with-generic-filters';

const SubSectionDemos: TemplateOnlyComponent = <template>
  <ShwTextH2>Demos</ShwTextH2>

  <ShwTextH3>Basic implementation</ShwTextH3>

  <CodeFragmentWithTable />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Live filtering</ShwTextH3>

  <CodeFragmentWithTable @isLiveFilter={{true}} />

  <ShwDivider @level={{2}} />

  <ShwTextH3>All filter types</ShwTextH3>

  <CodeFragmentWithComplexTable />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Generic filters</ShwTextH3>

  <CodeFragmentWithGenericFilters />

  <ShwDivider @level={{2}} />

  <ShwFrame
    @id="demo-filtering"
    @src="/components/advanced-table/frameless/demo-filtering"
    @height="780"
    @label="AdvancedTable with FilterBar in the context of a full App Frame"
  />

  <ShwDivider />
</template>;

export default SubSectionDemos;
