import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../text/body';

export interface PageHeaderDescriptionSignature {
  Args: HdsTextBodySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const PageHeaderDescriptionComponent =
  TemplateOnlyComponent<PageHeaderDescriptionSignature>();

export default PageHeaderDescriptionComponent;
