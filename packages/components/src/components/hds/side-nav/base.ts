import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsSideNavBaseSignature {
  Blocks: {
    root?: [];
    header?: [];
    body?: [];
    footer?: [];
  };
  Element: HTMLDivElement;
}

const HdsSideNavBaseComponent =
  TemplateOnlyComponent<HdsSideNavBaseSignature>();

export default HdsSideNavBaseComponent;
