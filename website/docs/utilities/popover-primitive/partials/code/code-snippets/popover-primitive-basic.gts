import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsPopoverPrimitive } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsPopoverPrimitive as |PP|>
    <div id="container" {{PP.setupPrimitiveContainer}}>
      <button
        id="toggle"
        type="button"
        {{PP.setupPrimitiveToggle}}
      >toggle</button>
      <div id="popover" {{PP.setupPrimitivePopover}}>popover content</div>
    </div>
  </HdsPopoverPrimitive>
</template>;

export default LocalComponent;
