import templateOnlyComponent from '@ember/component/template-only';

interface HdsFormToggleBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

const HdsFormToggleBaseComponent =
  templateOnlyComponent<HdsFormToggleBaseSignature>();

export default HdsFormToggleBaseComponent;
