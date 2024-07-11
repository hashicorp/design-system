import templateOnlyComponent from '@ember/component/template-only';

export interface HdsFormRadioBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormRadioBaseComponent =
  templateOnlyComponent<HdsFormRadioBaseSignature>();

export default HdsFormRadioBaseComponent;
