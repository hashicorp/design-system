import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { HdsComposite } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsComposite @orientation="vertical" as |C|>
    <ul role="listbox" {{C.composite}}>
      <li role="option" tabindex="-1" {{C.item}}>
        Vertical Option A
      </li>
      <li role="option" tabindex="-1" {{C.item}}>
        Vertical Option B
      </li>
      <li role="option" tabindex="-1" {{C.item}}>
        Vertical Option C
      </li>
    </ul>
  </HdsComposite>
</template>;

export default LocalComponent;