import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAccordion } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAccordion as |A|>
    <A.Item @ariaLabel="Mostrar u ocultar">
      <:toggle>Elemento uno</:toggle>
      <:content>
        Contenido adicional para el elemento uno
      </:content>
    </A.Item>
  </HdsAccordion>
</template>;

export default LocalComponent;
