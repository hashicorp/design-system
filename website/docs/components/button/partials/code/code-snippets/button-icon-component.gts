import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonIconSignature {
  Element: HdsButtonSignature['Element'];
}

const ButtonIcon: TemplateOnlyComponent<ButtonIconSignature> = <template>
  <HdsButton @text="Create cluster" @icon="plus" ...attributes />
</template>;

export default ButtonIcon;
