import templateOnlyComponent from '@ember/component/template-only';
import type { HdsFormFieldSignature } from '../field';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLabelSignature } from '../label';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormErrorSignature } from '../error';

export interface HdsFormToggleFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'isOptional'> & {
    value?: string;
  };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

const HdsFormToggleFieldComponent =
  templateOnlyComponent<HdsFormToggleFieldSignature>();

export default HdsFormToggleFieldComponent;
