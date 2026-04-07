import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { HdsComposite } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsComposite @loop={{true}} @wrap={{true}} as |C|>
    <div role="grid" {{C.composite}}>
      <div role="row" {{C.group}}>
        <button type="button" role="gridcell" {{C.item}}>Start</button>
        <button type="button" role="gridcell" {{C.item}}>Middle</button>
        <button type="button" role="gridcell" {{C.item}}>End (Wraps to Next Row)</button>
      </div>
      <div role="row" {{C.group}}>
        <button type="button" role="gridcell" {{C.item}}>Next Row Start</button>
        <button type="button" role="gridcell" {{C.item}}>Next Row End</button>
      </div>
    </div>
  </HdsComposite>
</template>;

export default LocalComponent;
