import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { HdsComposite } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsComposite @defaultCurrentId="second-item" as |C|>
    <div role="menu" {{C.composite}}>
      <button id="first-item" type="button" role="menuitem" {{C.item}}>
        First Item
      </button>
      <button id="second-item" type="button" role="menuitem" {{C.item}}>
        Second Item (Initially Active)
      </button>
      <button id="third-item" type="button" role="menuitem" {{C.item}}>
        Third Item
      </button>
    </div>
  </HdsComposite>
</template>;

export default LocalComponent;
