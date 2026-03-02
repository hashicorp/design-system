import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

import { HdsDisclosurePrimitive } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDisclosurePrimitive>
    <:toggle as |t|>
      <button type="button" {{on "click" t.onClickToggle}}>Click me</button>
    </:toggle>
    <:content>
      your content here
    </:content>
  </HdsDisclosurePrimitive>
</template>;

export default LocalComponent;
