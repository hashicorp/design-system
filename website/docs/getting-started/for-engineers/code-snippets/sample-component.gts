import type { TemplateOnlyComponent } from '@ember/component/template-only';
import {
  HdsButton,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';

import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';
import type { HdsFormTextInputFieldSignature } from '@hashicorp/design-system-components/components/hds/form/text-input/field';

interface LocalComponentSignature {
  Args: {
    fieldLabel: string;
    buttonSize?: HdsButtonSignature['Args']['size'];
  };
  Element: HdsFormTextInputFieldSignature['Element'];
}

const LocalComponent: TemplateOnlyComponent<LocalComponentSignature> =
  <template>
    <HdsFormTextInputField ...attributes as |F|>
      <F.Label>{{@fieldLabel}}</F.Label>
    </HdsFormTextInputField>
    <HdsButton @size={{@buttonSize}} @text="Save" type="submit" />
  </template>;

export default LocalComponent;
