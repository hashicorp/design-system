import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../text/body';

export interface HdsPageHeaderDescriptionSignature {
  Args: HdsTextBodySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsPageHeaderDescriptionComponent =
  TemplateOnlyComponent<HdsPageHeaderDescriptionSignature>();

export default HdsPageHeaderDescriptionComponent;
