import templateOnlyComponent from '@ember/component/template-only';

export interface HdsDropdownListItemSeparatorSignature {
  Element: HTMLLIElement;
}

const HdsDropdownListItemSeparatorComponent =
  templateOnlyComponent<HdsDropdownListItemSeparatorSignature>();

export default HdsDropdownListItemSeparatorComponent;
