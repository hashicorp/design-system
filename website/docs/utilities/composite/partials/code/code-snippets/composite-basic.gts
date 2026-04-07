import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { HdsComposite } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsComposite as |C|>
    <div role="menu" {{C.composite}}>
      <button type="button" role="menuitem" {{C.item}}>
        First Item
      </button>
      <button type="button" role="menuitem" {{C.item}}>
        Second Item
      </button>
      <button type="button" role="menuitem" {{C.item}}>
        Third Item
      </button>
    </div>
  </HdsComposite>
</template>;

export default LocalComponent;