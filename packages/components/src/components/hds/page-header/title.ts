import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsTextDisplaySignature } from '../text/display';

export interface HdsPageHeaderTitleSignature {
  Args: HdsTextDisplaySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

const HdsPageHeaderTitleComponent =
  TemplateOnlyComponent<HdsPageHeaderTitleSignature>();

export default HdsPageHeaderTitleComponent;
