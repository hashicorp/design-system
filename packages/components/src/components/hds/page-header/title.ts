import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsTextDisplaySignature } from '../text/display';

export interface PageHeaderTitleSignature {
  Args: HdsTextDisplaySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

const PageHeaderTitleComponent =
  TemplateOnlyComponent<PageHeaderTitleSignature>();

export default PageHeaderTitleComponent;
