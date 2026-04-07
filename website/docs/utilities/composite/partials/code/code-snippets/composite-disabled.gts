import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { HdsComposite } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsComposite as |C|>
    <div role="menu" {{C.composite}}>
      <button type="button" role="menuitem" {{C.item}}>
        Active Item
      </button>

      {{! The disabled argument prevents focus routing and applies disabled attributes }}
      <button type="button" role="menuitem" {{C.item disabled=true}}>
        Disabled Item (Skipped)
      </button>

      <button type="button" role="menuitem" {{C.item}}>
        Another Active Item
      </button>
    </div>
  </HdsComposite>
</template>;

export default LocalComponent;