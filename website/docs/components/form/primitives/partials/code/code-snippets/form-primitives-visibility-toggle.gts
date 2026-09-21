import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormVisibilityToggle,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @gap="24" as |LF|>
    <LF.Item>
      <HdsFormVisibilityToggle
        @isVisible={{true}}
        @ariaLabel="Toggle masked content"
        @ariaMessageText="Masked content is hidden"
      />
    </LF.Item>
    <LF.Item>
      <HdsFormVisibilityToggle
        @isVisible={{false}}
        @ariaLabel="Toggle masked content"
        @ariaMessageText="Masked content is visible"
      />
    </LF.Item>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
