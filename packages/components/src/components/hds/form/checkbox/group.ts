import templateOnlyComponent from '@ember/component/template-only';
import type { HdsFormFieldsetSignature } from '../fieldset';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormCheckboxFieldSignature } from './field';
import type { HdsFormErrorSignature } from '../error';

interface HdsFormCheckboxGroupSignature {
  Args: {
    layout?: HdsFormFieldsetSignature['Args']['layout'];
    name?: string;
    isRequired?: boolean;
    isOptional?: boolean;
  };
  Blocks: {
    default: [
      {
        Legend?: ComponentLike<HdsFormLegendSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        CheckboxField?: ComponentLike<HdsFormCheckboxFieldSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

const HdsFormCheckboxGroupComponent =
  templateOnlyComponent<HdsFormCheckboxGroupSignature>();

export default HdsFormCheckboxGroupComponent;
