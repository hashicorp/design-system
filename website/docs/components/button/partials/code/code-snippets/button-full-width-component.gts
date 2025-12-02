import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonFullWidthSignature {
  Element: HdsButtonSignature['Element'];
}

const ButtonFullWidth: TemplateOnlyComponent<ButtonFullWidthSignature> =
  <template>
    <HdsButton @text="Full width button" @isFullWidth={{true}} ...attributes />
  </template>;

export default ButtonFullWidth;
