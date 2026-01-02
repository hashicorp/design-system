import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import CodeFragmentWithPlaceholderItems from '../code-fragments/with-placeholder-items';

import { hash } from '@ember/helper';

const SubSectionWidthManagement: TemplateOnlyComponent = <template>
  <ShwTextH2>Column width management</ShwTextH2>

  <ShwTextH3>No column min width or column width set (fluid grid layout)</ShwTextH3>

  <ShwGrid
    @columns={{1}}
    @gap="1.5rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    <SG.Item @label="min-width defaults to 0px">
      <CodeFragmentWithPlaceholderItems />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Column min width (fluid grid layout)</ShwTextH3>

  <ShwTextH4>With same number of items or more than column tracks</ShwTextH4>

  <ShwGrid
    @columns={{1}}
    @gap="1.5rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    <SG.Item @label="250px min width columns">
      <CodeFragmentWithPlaceholderItems @columnMinWidth="250px" />
    </SG.Item>

    <SG.Item @label="30em min width columns">
      <CodeFragmentWithPlaceholderItems @columnMinWidth="30em" />
    </SG.Item>

    <SG.Item @label="33.33% min width columns w/ 4 items">
      <CodeFragmentWithPlaceholderItems @columnMinWidth="33.33%" />
    </SG.Item>
  </ShwGrid>

  <ShwTextH4>With fewer items than column tracks</ShwTextH4>

  <ShwGrid
    @columns={{1}}
    @gap="1.5rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
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

  <ShwTextH3>Column width (fixed grid layout)</ShwTextH3>

  <ShwTextH4>With same number of items or more than column tracks</ShwTextH4>

  <ShwGrid
    @columns={{1}}
    @gap="1.5rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    <SG.Item @label="25% width columns w/ 4 items">
      <CodeFragmentWithPlaceholderItems @columnWidth="25%" />
    </SG.Item>

    <SG.Item @label="33.33% width columns w/ 4 items">
      <CodeFragmentWithPlaceholderItems @columnWidth="33.33%" />
    </SG.Item>
  </ShwGrid>

  <ShwTextH4>With fewer items than column tracks</ShwTextH4>

  <ShwGrid
    @columns={{1}}
    @gap="1.5rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
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

  <ShwTextH4>With responsive column widths</ShwTextH4>

  <ShwTextBody>With same number of items or more than column tracks</ShwTextBody>

  <ShwGrid
    @columns={{1}}
    @gap="1.5rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    <SG.Item
      @label="All views defined, sm view = 1 column, md view = 2 columns, lg view = 3 columns, xl view = 4 columns, xxl view = 5 columns"
    >
      <CodeFragmentWithPlaceholderItems
        @columnCount={{5}}
        @columnWidth={{hash sm="100%" md="50%" lg="33.33%" xl="25%" xxl="20%"}}
      />
    </SG.Item>

    <SG.Item
      @label="Only sm & md defined, sm view = 1 column, md & other views = 3 columns"
    >
      <CodeFragmentWithPlaceholderItems
        @columnCount={{5}}
        @columnWidth={{hash sm="100%" md="33.33%"}}
      />
    </SG.Item>

    <SG.Item
      @label="Only sm, md, & xxl defined, sm view = 1 column, other views except xxl = 3 columns, xxl = 5 columns"
    >
      <CodeFragmentWithPlaceholderItems
        @columnCount={{5}}
        @columnWidth={{hash sm="100%" md="33.33%" xxl="20%"}}
      />
    </SG.Item>

    <SG.Item
      @label="Only sm & xxl defined, other views except xxl = 2 columns, xxl = 5 columns"
    >
      <CodeFragmentWithPlaceholderItems
        @columnCount={{5}}
        @columnWidth={{hash sm="50%" xxl="20%"}}
      />
    </SG.Item>

    <SG.Item
      @label="sm & md are undefined, lg = 3 columns, xl = 4 columns, xxl = 5 columns"
    >
      <CodeFragmentWithPlaceholderItems
        @columnCount={{5}}
        @columnWidth={{hash lg="33.33%" xl="25%" xxl="20%"}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwTextBody>With fewer items than column tracks</ShwTextBody>

  <ShwGrid
    @columns={{1}}
    @gap="1.5rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    <SG.Item
      @label="All views defined, sm = 2 columns, md = 3 columns, lg = 4 columns, xl = 5 columns, xxl = 6 columns"
    >
      <CodeFragmentWithPlaceholderItems
        @columnCount={{1}}
        @columnWidth={{hash
          sm="50%"
          md="33.33%"
          lg="25%"
          xl="20%"
          xxl="16.67%"
        }}
      />
    </SG.Item>

    <SG.Item
      @label="sm & md are undefined, lg = 3 columns, xl = 4 columns, xxl = 5 columns"
    >
      <CodeFragmentWithPlaceholderItems
        @columnCount={{2}}
        @columnWidth={{hash lg="33.33%" xl="25%" xxl="20%"}}
      />
    </SG.Item>

    <SG.Item @label="Only sm is defined, sm = 2 columns">
      <CodeFragmentWithPlaceholderItems
        @columnCount={{1}}
        @columnWidth={{hash sm="50%"}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionWidthManagement;
