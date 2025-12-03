import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAccordion } from '@hashicorp/design-system-components/components';
import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

interface AccordionA11yNameSignature {
  Element: HdsAccordionSignature['Element'];
}

const AccordionA11yName: TemplateOnlyComponent<AccordionA11yNameSignature> =
  <template>
    <HdsAccordion ...attributes as |A|>
      <A.Item @ariaLabel="Mostrar u ocultar">
        <:toggle>Elemento uno</:toggle>
        <:content>
          Contenido adicional para el elemento uno
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>;

export default AccordionA11yName;
