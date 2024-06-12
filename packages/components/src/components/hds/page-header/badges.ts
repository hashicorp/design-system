import TemplateOnlyComponent from '@ember/component/template-only';

export interface PageHeaderBadgesSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const PageHeaderBadgesComponent =
  TemplateOnlyComponent<PageHeaderBadgesSignature>();

export default PageHeaderBadgesComponent;
