import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonIconPositionSignature {
  Element: HdsButtonSignature['Element'];
}

const ButtonIconPosition: TemplateOnlyComponent<ButtonIconPositionSignature> =
  <template>
    <HdsButton
      @text="Next step"
      @icon="arrow-right"
      @iconPosition="trailing"
      ...attributes
    />
  </template>;

export default ButtonIconPosition;
