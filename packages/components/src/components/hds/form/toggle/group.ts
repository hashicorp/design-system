import templateOnlyComponent from '@ember/component/template-only';
import type { HdsFormFieldsetSignature } from '../fieldset';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormToggleFieldSignature } from './field';
import type { HdsFormErrorSignature } from '../error';

interface HdsFormToggleGroupSignature {
  Args: {
    layout?: HdsFormFieldsetSignature['Args']['layout'];
    isRequired?: boolean;
    isOptional?: boolean;
  };
  Blocks: {
    default: [
      {
        Legend?: ComponentLike<HdsFormLegendSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        ToggleField?: ComponentLike<HdsFormToggleFieldSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

const HdsFormToggleGroupComponent =
  templateOnlyComponent<HdsFormToggleGroupSignature>();

export default HdsFormToggleGroupComponent;
