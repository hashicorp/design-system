import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { HdsComposite } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsComposite as |C|>
    <div role="grid" {{C.composite}}>
      <div role="row" {{C.group}}>
        <button type="button" role="gridcell" {{C.item}}>Row 1, Col 1</button>
        <button type="button" role="gridcell" {{C.item}}>Row 1, Col 2</button>
      </div>
      <div role="row" {{C.group}}>
        <button type="button" role="gridcell" {{C.item}}>Row 2, Col 1</button>
        <button type="button" role="gridcell" {{C.item}}>Row 2, Col 2</button>
      </div>
    </div>
  </HdsComposite>
</template>;

export default LocalComponent;