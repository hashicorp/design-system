import TemplateOnlyComponent from '@ember/component/template-only';

interface HdsSideNavHeaderSignature {
  Blocks: {
    logo?: [];
    actions?: [];
  };
  Element: HTMLDivElement;
}

const HdsSideNavHeaderComponent =
  TemplateOnlyComponent<HdsSideNavHeaderSignature>();

export default HdsSideNavHeaderComponent;
