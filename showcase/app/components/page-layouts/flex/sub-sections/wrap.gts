import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { array } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

const SubSectionWrap: TemplateOnlyComponent = <template>
  <ShwTextH2>Wrap</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    {{#let (array false true) as |booleans|}}
      {{#each booleans as |wrap|}}
        <SF.Item
          @label={{if wrap "wrap" "nowrap (default)"}}
          class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
        >
          <div {{style width="650px" max-width="100%"}}>
            <HdsLayoutFlex @wrap={{wrap}}>
              <ShwPlaceholder
                @text="#1"
                @width="200"
                @height="40"
                {{style flex-shrink="0"}}
              />
              <ShwPlaceholder
                @text="#2"
                @width="200"
                @height="40"
                {{style flex-shrink="0"}}
              />
              <ShwPlaceholder
                @text="#3"
                @width="200"
                @height="40"
                {{style flex-shrink="0"}}
              />
              <ShwPlaceholder
                @text="#4"
                @width="200"
                @height="40"
                {{style flex-shrink="0"}}
              />
              <ShwPlaceholder
                @text="#5"
                @width="200"
                @height="40"
                {{style flex-shrink="0"}}
              />
            </HdsLayoutFlex>
          </div>
        </SF.Item>
      {{/each}}
    {{/let}}
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionWrap;
