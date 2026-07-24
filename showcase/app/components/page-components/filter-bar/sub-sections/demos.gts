/**
 * Copyright IBM Corp. 2021, 2026
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
import CodeFragmentWithWrapping from 'showcase/components/page-components/filter-bar/code-fragments/with-wrapping';
import CodeFragmentWithWrappingNoSegmentedGroup from 'showcase/components/page-components/filter-bar/code-fragments/with-wrapping-no-segmented-group';
import CodeFragmentWithWrappingResponsive from 'showcase/components/page-components/filter-bar/code-fragments/with-wrapping-responsive';

const SubSectionDemos: TemplateOnlyComponent = <template>
  <ShwTextH2>Demos</ShwTextH2>

  <ShwTextH3>Wrapping</ShwTextH3>

  <CodeFragmentWithWrapping />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Wrapping (no segmented group)</ShwTextH3>

  <CodeFragmentWithWrappingNoSegmentedGroup />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Wrapping (responsive with dropdown)</ShwTextH3>

  <CodeFragmentWithWrappingResponsive />

  <ShwDivider @level={{2}} />

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
