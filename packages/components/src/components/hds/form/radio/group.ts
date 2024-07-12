import templateOnlyComponent from '@ember/component/template-only';
import type { HdsFormFieldsetSignature } from '../fieldset';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormRadioFieldSignature } from './field';
import type { HdsFormErrorSignature } from '../error';

interface HdsFormRadioGroupSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    name?: string;
  };
  Blocks: {
    default: [
      {
        Legend?: ComponentLike<HdsFormLegendSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        RadioField?: ComponentLike<HdsFormRadioFieldSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

const HdsFormRadioGroupComponent =
  templateOnlyComponent<HdsFormRadioGroupSignature>();

export default HdsFormRadioGroupComponent;
