import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonIconOnlySignature {
  Element: HdsButtonSignature['Element'];
}

const ButtonIconOnly: TemplateOnlyComponent<ButtonIconOnlySignature> =
  <template>
    <HdsButton
      @text="Create cluster"
      @icon="plus"
      @isIconOnly={{true}}
      ...attributes
    />
  </template>;

export default ButtonIconOnly;
