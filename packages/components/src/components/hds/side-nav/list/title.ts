import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsSideNavListTitleSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsSideNavListTitleComponent =
  TemplateOnlyComponent<HdsSideNavListTitleSignature>();

export default HdsSideNavListTitleComponent;
