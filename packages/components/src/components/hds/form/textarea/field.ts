import templateOnlyComponent from '@ember/component/template-only';

import type { HdsFormFieldSignature } from '../field';
import type { HdsFormTextareaBaseSignature } from './base';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { HdsFormErrorSignature } from '../error';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormLabelSignature } from '../label';
import type HdsFormCharacterCountComponent from '../character-count';

interface HdsFormTextareaFieldSignature {
  Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> &
    HdsFormTextareaBaseSignature['Args'];
  Blocks: {
    default: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
        CharacterCount?: WithBoundArgs<
          typeof HdsFormCharacterCountComponent,
          'value'
        >;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

const HdsFormTextareaFieldComponent =
  templateOnlyComponent<HdsFormTextareaFieldSignature>();

export default HdsFormTextareaFieldComponent;
