import templateOnlyComponent from '@ember/component/template-only';

export interface HdsFormVisibilityToggleSignature {
  Args: {
    ariaLabel?: string;
    ariaMessageText?: string;
    isVisible?: boolean;
  };
  Element: HTMLButtonElement;
}

const HdsFormVisibilityToggleComponent =
  templateOnlyComponent<HdsFormVisibilityToggleSignature>();

export default HdsFormVisibilityToggleComponent;
