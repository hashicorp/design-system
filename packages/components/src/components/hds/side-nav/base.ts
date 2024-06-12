import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsSideNavBaseSignature {
  Blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    root?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    header?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    footer?: any;
  };
  Element: HTMLDivElement;
}

const HdsSideNavBaseComponent =
  TemplateOnlyComponent<HdsSideNavBaseSignature>();

export default HdsSideNavBaseComponent;
