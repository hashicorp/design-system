import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

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
      <ShwOutliner>
        <HdsLayoutGrid @gap="24">
          <ShwPlaceholder @text="#1" @height="40" />
          <ShwPlaceholder @text="#2" @height="40" />
          <ShwPlaceholder @text="#3" @height="40" />
          <ShwPlaceholder @text="#4" @height="40" />
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>

    <SG.Item @label="250px min width columns">
      <ShwOutliner>
        <HdsLayoutGrid @gap="24" @columnMinWidth="250px">
          <ShwPlaceholder @text="#1" @height="40" />
          <ShwPlaceholder @text="#2" @height="40" />
          <ShwPlaceholder @text="#3" @height="40" />
          <ShwPlaceholder @text="#4" @height="40" />
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>

    <SG.Item @label="30em min width columns">
      <ShwOutliner>
        <HdsLayoutGrid @gap="24" @columnMinWidth="30em">
          <ShwPlaceholder @text="#1" @height="40" />
          <ShwPlaceholder @text="#2" @height="40" />
          <ShwPlaceholder @text="#3" @height="40" />
          <ShwPlaceholder @text="#4" @height="40" />
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>

    <SG.Item @label="33.33% min width columns w/ 4 items">
      <ShwOutliner>
        <HdsLayoutGrid @gap="24" @columnMinWidth="33.33%">
          <ShwPlaceholder @text="#1" @height="40" />
          <ShwPlaceholder @text="#2" @height="40" />
          <ShwPlaceholder @text="#3" @height="40" />
          <ShwPlaceholder @text="#4" @height="40" />
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>

    <SG.Item @label="33.33% min width columns w/ 2 items">
      <ShwOutliner>
        <HdsLayoutGrid @gap="24" @columnMinWidth="33.33%">
          <ShwPlaceholder @text="#1" @height="40" />
          <ShwPlaceholder @text="#2" @height="40" />
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>

    <SG.Item @label="33.33% min width columns w/ 1 item">
      <ShwOutliner>
        <HdsLayoutGrid @gap="24" @columnMinWidth="33.33%">
          <ShwPlaceholder @text="#1" @height="40" />
        </HdsLayoutGrid>
      </ShwOutliner>
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
    <SG.Item @label="33.33% width columns">
      <ShwOutliner>
        <HdsLayoutGrid @gap="24" @columnWidth="33.33%">
          <ShwPlaceholder @text="#1" @height="40" />
          <ShwPlaceholder @text="#2" @height="40" />
          <ShwPlaceholder @text="#3" @height="40" />
          <ShwPlaceholder @text="#4" @height="40" />
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>

    <SG.Item @label="33.33% width columns w/ 2 items">
      <ShwOutliner>
        <HdsLayoutGrid @gap="24" @columnWidth="33.33%">
          <ShwPlaceholder @text="#1" @height="40" />
          <ShwPlaceholder @text="#2" @height="40" />
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>

    <SG.Item @label="33.33% width columns w/ 1 item">
      <ShwOutliner>
        <HdsLayoutGrid @gap="24" @columnWidth="33.33%">
          <ShwPlaceholder @text="#1" @height="40" />
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionWidthManagement;
