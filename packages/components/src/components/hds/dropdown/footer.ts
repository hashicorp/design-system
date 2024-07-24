import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDropdownFooterSignature {
  Args: {
    hasDivider: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsDropdownFooterComponent =
  templateOnlyComponent<HdsDropdownFooterSignature>();

export default HdsDropdownFooterComponent;
