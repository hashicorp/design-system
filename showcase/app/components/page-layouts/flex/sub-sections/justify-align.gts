import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { eq } from 'ember-truth-helpers';
import { concat } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import {
  DIRECTIONS,
  JUSTIFYS,
  ALIGNS,
} from '@hashicorp/design-system-components/components/hds/layout/flex/index';

const SubSectionJustifyAlign: TemplateOnlyComponent = <template>
  <ShwTextH2>Justify + Align</ShwTextH2>
  <ShwTextBody>These are the
    <code>justify-content</code>
    and
    <code>align-items</code>
    CSS properties of
    <code>flexbox</code>.</ShwTextBody>

  {{#each DIRECTIONS as |direction|}}
    <ShwTextH3>direction={{direction}}</ShwTextH3>
    <ShwGrid @columns={{JUSTIFYS.length}} @gap="2rem" as |SG|>
      {{#each ALIGNS as |align ac|}}
        {{#if (eq ac 0)}}
          {{#each JUSTIFYS as |justify|}}
            <SG.Item>
              <span class="shw-label">justify={{justify}}</span>
            </SG.Item>
          {{/each}}
        {{/if}}
        {{#each JUSTIFYS as |justify jc|}}
          {{! Notice: we're  using an invisible character here to preserve the alignment of the items }}
          <SG.Item
            {{! eslint-disable-next-line no-irregular-whitespace }}
            @label={{if (eq jc 0) (concat "align=" align) "​"}}
            class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
          >
            <div {{style width="120px" height="120px"}}>
              <HdsLayoutFlex
                @direction={{direction}}
                @justify={{justify}}
                @align={{align}}
                {{style width="100%" height="100%"}}
              >
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
              </HdsLayoutFlex>
            </div>
          </SG.Item>
        {{/each}}
      {{/each}}
    </ShwGrid>
  {{/each}}

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionJustifyAlign;
