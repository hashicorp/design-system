import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

const SubSectionDirection: TemplateOnlyComponent = <template>
  <ShwTextH2>Direction</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="row (default)"
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <HdsLayoutFlex @direction="row">
        <ShwPlaceholder @text="item #1" @height="40" />
        <ShwPlaceholder @text="item #2" @height="40" />
        <ShwPlaceholder @text="item #3" @height="40" />
        <ShwPlaceholder @text="item #4" @height="40" />
      </HdsLayoutFlex>
    </SF.Item>
    <SF.Item
      @label="column"
      {{style width="25%"}}
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <HdsLayoutFlex @direction="column">
        <ShwPlaceholder @text="item #1" @height="40" />
        <ShwPlaceholder @text="item #2" @height="40" />
        <ShwPlaceholder @text="item #3" @height="40" />
        <ShwPlaceholder @text="item #4" @height="40" />
      </HdsLayoutFlex>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionDirection;
