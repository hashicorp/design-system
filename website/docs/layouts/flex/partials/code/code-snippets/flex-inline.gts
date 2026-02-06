import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <p>It is going to be a
    <HdsLayoutFlex @isInline={{true}} @tag="span" @gap="4">
      <DocPlaceholder
        @width="16px"
        @height="16px"
        @text="😎"
        @background="#e4c5f3"
      />
      <DocPlaceholder @height="16px" @text="Sunny day" @background="#fff8d2" />
    </HdsLayoutFlex>
    this Sunday.</p>
</template>;

export default LocalComponent;
