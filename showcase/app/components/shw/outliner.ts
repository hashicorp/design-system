import templateOnlyComponent from '@ember/component/template-only';

export interface OutlinerComponentSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const OutlinerComponent = templateOnlyComponent<OutlinerComponentSignature>();

export default OutlinerComponent;
