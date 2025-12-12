import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonLayoutSignature {
  Element: HdsButtonSignature['Element'];
}

const ButtonLayout: TemplateOnlyComponent<ButtonLayoutSignature> = <template>
  <div class="doc-button-mock-text-align-right">
    <HdsButton @text="inline layout" @isInline={{true}} ...attributes />
  </div>
</template>;

export default ButtonLayout;
