import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../text/body';

export interface PageHeaderSubtitleSignature {
  Args: HdsTextBodySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const PageHeaderSubtitleComponent =
  TemplateOnlyComponent<PageHeaderSubtitleSignature>();

export default PageHeaderSubtitleComponent;
