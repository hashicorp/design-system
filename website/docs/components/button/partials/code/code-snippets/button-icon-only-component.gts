import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonIconPositionSignature {
  Element: HdsButtonSignature['Element'];
}

const ButtonIconPosition: TemplateOnlyComponent<ButtonIconPositionSignature> =
  <template>
    <HdsButton
      @text="Create cluster"
      @icon="plus"
      @isIconOnly={{true}}
      ...attributes
    />
  </template>;

export default ButtonIconPosition;
