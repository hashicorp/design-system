import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonTypeSignature {
  Element: HdsButtonSignature['Element'];
}

const ButtonType: TemplateOnlyComponent<ButtonTypeSignature> = <template>
  <HdsButton @text="Submit" type="submit" ...attributes />
</template>;

export default ButtonType;
