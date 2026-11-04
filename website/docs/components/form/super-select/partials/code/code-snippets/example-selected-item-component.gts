import type { TemplateOnlyComponent } from '@ember/component/template-only';
import type { PowerSelectSelectedItemSignature } from 'ember-power-select/types';

interface ClusterSizeOption {
  size: string;
  description: string;
  price: string;
}

const ExampleSelectedItemComponent: TemplateOnlyComponent<
  PowerSelectSelectedItemSignature<ClusterSizeOption>
> = <template>
  <span>
    {{@selected.size}}
  </span>
</template>;

export default ExampleSelectedItemComponent;
