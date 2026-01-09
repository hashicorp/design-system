import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';

import {
  HdsLayoutGrid,
  HdsLayoutGridItem,
} from '@hashicorp/design-system-components/components';

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>GridItem</ShwTextH3>

  <ShwGrid @columns={{1}} as |SG|>
    <SG.Item @label="used directly or via yielded component">
      <ShwOutliner>
        <HdsLayoutGrid as |HLG|>
          <ShwPlaceholder @text="item #1" @height="40" @background="#e4c5f3" />

          <HdsLayoutGridItem>
            <ShwPlaceholder
              @text="item #2 within GridItem"
              @height="40"
              @background="#e5ffd2"
            />
          </HdsLayoutGridItem>

          <ShwPlaceholder @text="item #3" @height="40" @background="#d2f4ff" />

          <HLG.Item>
            <ShwPlaceholder
              @text="item #4 within HLG.Item"
              @height="40"
              @background="#fff8d2"
            />
          </HLG.Item>
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH4>colspan</ShwTextH4>

  <ShwGrid @columns={{1}} @gap="1.5rem" as |SG|>
    <SG.Item @label="1st item w/ colspan=2">
      <ShwOutliner>
        <HdsLayoutGrid @columnMinWidth="250px" @gap="12" as |HLG|>
          <HLG.Item @colspan={{2}}>
            <ShwPlaceholder @text="#1" @height="40" @background="#e4c5f3" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#2" @height="40" @background="#e5ffd2" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#3" @height="40" @background="#d2f4ff" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#4" @height="40" @background="#fff8d2" />
          </HLG.Item>
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>

    <SG.Item @label="1st item w/ colspan=3">
      <ShwOutliner>
        <HdsLayoutGrid @columnMinWidth="250px" @gap="12" as |HLG|>
          <HLG.Item @colspan={{3}}>
            <ShwPlaceholder @text="#1" @height="40" @background="#e4c5f3" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#2" @height="40" @background="#e5ffd2" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#3" @height="40" @background="#d2f4ff" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#4" @height="40" @background="#fff8d2" />
          </HLG.Item>
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>

    <SG.Item @label="1st item w/ colspan=4">
      <ShwOutliner>
        <HdsLayoutGrid @columnMinWidth="250px" @gap="12" as |HLG|>
          <HLG.Item @colspan={{4}}>
            <ShwPlaceholder @text="#1" @height="40" @background="#e4c5f3" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#2" @height="40" @background="#e5ffd2" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#3" @height="40" @background="#d2f4ff" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#4" @height="40" @background="#fff8d2" />
          </HLG.Item>
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH4>rowspan</ShwTextH4>

  <ShwGrid @columns={{1}} @gap="1.5rem" as |SG|>
    <SG.Item @label="1st item w/ rowspan=2">
      <ShwOutliner>
        <HdsLayoutGrid @columnMinWidth="33.33%" @gap="12" as |HLG|>
          <HLG.Item @rowspan={{2}}>
            <ShwPlaceholder @text="#1" @height="100%" @background="#e4c5f3" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#2" @height="40" @background="#e5ffd2" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#3" @height="40" @background="#d2f4ff" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#4" @height="40" @background="#fff8d2" />
          </HLG.Item>
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>

    <SG.Item @label="2nd item w/ rowspan=3">
      <ShwOutliner>
        <HdsLayoutGrid @columnMinWidth="50%" @gap="12" as |HLG|>
          <HLG.Item>
            <ShwPlaceholder @text="#1" @height="40" @background="#e4c5f3" />
          </HLG.Item>
          <HLG.Item @rowspan={{3}}>
            <ShwPlaceholder @text="#2" @height="100%" @background="#e5ffd2" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#3" @height="40" @background="#d2f4ff" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#4" @height="40" @background="#fff8d2" />
          </HLG.Item>
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH4>colspan & rowspan</ShwTextH4>

  <ShwGrid @columns={{1}} @gap="1.5rem" as |SG|>
    <SG.Item @label="1st item w/ colspan=2 & rowspan=3">
      <ShwOutliner>
        <HdsLayoutGrid @columnMinWidth="33.33%" @gap="12" as |HLG|>
          <HLG.Item @colspan={{2}} @rowspan={{3}}>
            <ShwPlaceholder @text="#1" @height="100%" @background="#e4c5f3" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#2" @height="40" @background="#e5ffd2" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#3" @height="40" @background="#d2f4ff" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#4" @height="40" @background="#fff8d2" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#5" @height="40" @background="#f3d9c5" />
          </HLG.Item>
          <HLG.Item>
            <ShwPlaceholder @text="#6" @height="40" @background="#fee1ec" />
          </HLG.Item>
        </HdsLayoutGrid>
      </ShwOutliner>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionBaseElements;
