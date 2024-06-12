import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsSideNavListItemSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsSideNavListItemComponent =
  TemplateOnlyComponent<HdsSideNavListItemSignature>();

export default HdsSideNavListItemComponent;
