import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonWithRouteSignature {
  Element: HdsButtonSignature['Element'];
}

const ButtonWithRoute: TemplateOnlyComponent<ButtonWithRouteSignature> =
  <template>
    <HdsButton
      @text="Back to homepage"
      @icon="arrow-left"
      @route="index"
      ...attributes
    />
  </template>;

export default ButtonWithRoute;
