import templateOnlyComponent from '@ember/component/template-only';
import type { HdsFormFieldsetSignature } from '../fieldset';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormRadioCardSignature } from './index';
import type { HdsFormErrorSignature } from '../error';
import type {
  HdsFormRadioCardControlPositions,
  HdsFormRadioCardAlignments,
} from './types';

interface HdsFormRadioCardGroupSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    controlPosition: HdsFormRadioCardControlPositions;
    alignment: HdsFormRadioCardAlignments;
    name?: string;
  };
  Blocks: {
    default: [
      {
        Legend?: ComponentLike<HdsFormLegendSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        RadioCard?: ComponentLike<HdsFormRadioCardSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

const HdsFormRadioCardGroupComponent =
  templateOnlyComponent<HdsFormRadioCardGroupSignature>();

export default HdsFormRadioCardGroupComponent;
