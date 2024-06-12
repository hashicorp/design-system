import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../text/body';

export interface HdsPageHeaderSubtitleSignature {
  Args: HdsTextBodySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsPageHeaderSubtitleComponent =
  TemplateOnlyComponent<HdsPageHeaderSubtitleSignature>();

export default HdsPageHeaderSubtitleComponent;
