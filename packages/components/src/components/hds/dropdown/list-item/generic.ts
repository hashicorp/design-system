import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDropdownListItemGenericSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const HdsDropdownListItemGenericComponent =
  templateOnlyComponent<HdsDropdownListItemGenericSignature>();

export default HdsDropdownListItemGenericComponent;
