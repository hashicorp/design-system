import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import CodeFragmentWithPlaceholderItems from '../code-fragments/with-placeholder-items';

import { hash } from '@ember/helper';

const SubSectionWidthManagement: TemplateOnlyComponent = <template>
  <ShwTextH2>Column width management </ShwTextH2>

  <ShwTextH3>Column min width</ShwTextH3>

  <ShwGrid
    @columns={{1}}
    @gap="1.5rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    <SG.Item @label="No min width columns (min-width defaults to 0px)">
      <CodeFragmentWithPlaceholderItems />
    </SG.Item>

    <SG.Item @label="250px min width columns">
      <CodeFragmentWithPlaceholderItems @columnMinWidth="250px" />
    </SG.Item>

    <SG.Item @label="30em min width columns">
      <CodeFragmentWithPlaceholderItems @columnMinWidth="30em" />
    </SG.Item>

    <SG.Item @label="33.33% min width columns w/ 4 items">
      <CodeFragmentWithPlaceholderItems @columnMinWidth="33.33%" />
    </SG.Item>

    <SG.Item @label="33.33% min width columns w/ 2 items">
      <CodeFragmentWithPlaceholderItems
        @columnCount={{2}}
        @columnMinWidth="33.33%"
      />
    </SG.Item>

    <SG.Item @label="33.33% min width columns w/ 1 item">
      <CodeFragmentWithPlaceholderItems
        @columnCount={{1}}
        @columnMinWidth="33.33%"
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Column width</ShwTextH3>

  <ShwGrid
    @columns={{1}}
    @gap="1.5rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    <SG.Item @label="33.33% width columns w/ 4 items">
      <CodeFragmentWithPlaceholderItems @columnWidth="33.33%" />
    </SG.Item>

    <SG.Item @label="33.33% width columns w/ 2 items">
      <CodeFragmentWithPlaceholderItems
        @columnCount={{2}}
        @columnWidth="33.33%"
      />
    </SG.Item>

    <SG.Item @label="33.33% width columns w/ 1 item">
      <CodeFragmentWithPlaceholderItems
        @columnCount={{1}}
        @columnWidth="33.33%"
      />
    </SG.Item>

    <SG.Item @label="50% width columns w/ 4 items">
      <CodeFragmentWithPlaceholderItems @columnCount={{4}} @columnWidth="50%" />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Responsive column width</ShwTextH3>

  <ShwGrid
    @columns={{1}}
    @gap="1.5rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    <SG.Item
      @label="sm view = 1 column, md view = 2 columns, lg view = 3 columns, xl view = 4 columns, xxl view = 5 columns"
    >
      <CodeFragmentWithPlaceholderItems
        @columnCount={{5}}
        @columnWidth={{hash sm="100%" md="50%" lg="33.33%" xl="25%" xxl="20%"}}
      />
    </SG.Item>

    <SG.Item @label="sm view = 1 column, md & all other views = 3 columns">
      <CodeFragmentWithPlaceholderItems
        @columnCount={{5}}
        @columnWidth={{hash sm="100%" md="33.33%"}}
      />
    </SG.Item>

    <SG.Item
      @label="sm view = 1 column, md & all other views except xxl = 3 columns, xxl = 5 columns"
    >
      <CodeFragmentWithPlaceholderItems
        @columnCount={{5}}
        @columnWidth={{hash sm="100%" md="33.33%" xxl="20%"}}
      />
    </SG.Item>

    <SG.Item
      @label="sm view & all other views except xxl = 2 columns, xxl = 5 columns"
    >
      <CodeFragmentWithPlaceholderItems
        @columnCount={{5}}
        @columnWidth={{hash sm="50%" xxl="20%"}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionWidthManagement;
