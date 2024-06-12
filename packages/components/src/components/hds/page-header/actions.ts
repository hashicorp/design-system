import TemplateOnlyComponent from '@ember/component/template-only';

export interface PageHeaderActionsSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const PageHeaderActionsComponent =
  TemplateOnlyComponent<PageHeaderActionsSignature>();

export default PageHeaderActionsComponent;
