import TemplateOnlyComponent from '@ember/component/template-only';

export interface HdsPageHeaderActionsSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsPageHeaderActionsComponent =
  TemplateOnlyComponent<HdsPageHeaderActionsSignature>();

export default HdsPageHeaderActionsComponent;
