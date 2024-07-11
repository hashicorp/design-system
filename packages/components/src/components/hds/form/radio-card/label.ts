import templateOnlyComponent from '@ember/component/template-only';
import type { HdsTextDisplaySignature } from '../../text/display';

export interface HdsFormRadioCardLabelSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

const HdsFormRadioCardLabelComponent =
  templateOnlyComponent<HdsFormRadioCardLabelSignature>();

export default HdsFormRadioCardLabelComponent;
