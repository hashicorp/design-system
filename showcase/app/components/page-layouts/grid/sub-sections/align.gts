import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { concat } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';
import { ALIGNS } from '@hashicorp/design-system-components/components/hds/layout/grid/index';

const SubSectionAlign: TemplateOnlyComponent = <template>
  <ShwTextH2>Align</ShwTextH2>
  <ShwTextBody>
    This is the
    <code>align-items</code>
    CSS property of
    <code>css grid</code>.
  </ShwTextBody>

  <ShwGrid
    @columns={{ALIGNS.length}}
    @gap="2rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    {{#each ALIGNS as |align|}}
      <SG.Item @label={{(concat "align=" align)}}>
        <ShwOutliner {{style width="120px" height="120px"}}>
          <HdsLayoutGrid @align={{align}} {{style width="100%" height="100%"}}>
            <ShwPlaceholder
              @text="#A"
              @width="auto"
              @height="auto"
              {{style min-width="24px" min-height="24px"}}
            />
            <ShwPlaceholder
              @text="#B"
              @width="auto"
              @height="auto"
              {{style min-width="24px" min-height="24px"}}
            />
            <ShwPlaceholder
              @text="#C"
              @width="auto"
              @height="auto"
              {{style min-width="24px" min-height="24px"}}
            />
          </HdsLayoutGrid>
        </ShwOutliner>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionAlign;
