import templateOnlyComponent from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../../text/body';

export interface HdsFormRadioCardDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormRadioCardDescriptionComponent =
  templateOnlyComponent<HdsFormRadioCardDescriptionSignature>();

export default HdsFormRadioCardDescriptionComponent;
