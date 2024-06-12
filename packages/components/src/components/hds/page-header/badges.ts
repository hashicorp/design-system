import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsPageHeaderBadgesSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsPageHeaderBadgesComponent =
  TemplateOnlyComponent<HdsPageHeaderBadgesSignature>();

export default HdsPageHeaderBadgesComponent;
