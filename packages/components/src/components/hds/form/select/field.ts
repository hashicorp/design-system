import templateOnlyComponent from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { HdsFormErrorSignature } from '../error';
import type { HdsFormFieldSignature } from '../field';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormLabelSignature } from '../label';
import type { HdsYieldSignature } from '../../yield';

interface HdsFormSelectFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> & {
    isInvalid?: boolean;
    width?: string;
  };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
        Options?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

const HdsFormSelectFieldComponent =
  templateOnlyComponent<HdsFormSelectFieldSignature>();

export default HdsFormSelectFieldComponent;
