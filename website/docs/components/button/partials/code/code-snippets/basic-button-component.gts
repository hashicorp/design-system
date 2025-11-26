import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface BasicButton {
  Element: HdsButtonSignature['Element'];
}

const BasicButton: TemplateOnlyComponent<BasicButton> = <template>
  <HdsButton @text="Basic button" ...attributes />
</template>;

export default BasicButton;
