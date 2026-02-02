import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <div {{style height="400px" border="1px solid"}}>
    <HdsLayoutGrid
      @columnMinWidth="25%"
      @gap="12"
      {{style height="100%" grid-template-rows="min-content"}}
      as |LG|
    >
      <LG.Item @colspan={{4}}>
        <DocPlaceholder
          @text="Item 1"
          @background="#e4c5f3"
          {{style padding="1em"}}
        />
      </LG.Item>

      <LG.Item @rowspan={{3}}>
        <DocPlaceholder @height="100%" @text="Item 2" @background="#e5ffd2" />
      </LG.Item>

      <LG.Item @colspan={{3}}>
        <DocPlaceholder @height="100%" @text="Item 3" @background="#d2f4ff" />
      </LG.Item>

      <LG.Item @colspan={{3}} @rowspan={{2}}>
        <DocPlaceholder @height="100%" @text="Item 4" @background="#fff8d2" />
      </LG.Item>
    </HdsLayoutGrid>
  </div>
</template>;

export default LocalComponent;
