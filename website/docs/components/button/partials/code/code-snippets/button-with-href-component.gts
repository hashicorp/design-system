import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonWithHrefSignature {
  Element: HdsButtonSignature['Element'];
}

const ButtonWithHref: TemplateOnlyComponent<ButtonWithHrefSignature> =
  <template>
    <HdsButton
      @text="Visit website"
      @icon="external-link"
      @iconPosition="trailing"
      @href="https://hashicorp.com"
      ...attributes
    />
  </template>;

export default ButtonWithHref;
