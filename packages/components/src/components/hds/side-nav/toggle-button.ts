import templateOnlyComponent from '@ember/component/template-only';

interface ToggleButtonSignature {
  Args: {
    icon: unknown;
  };
  Element: HTMLButtonElement;
}

const ToggleButtonComponent =
  templateOnlyComponent<ToggleButtonSignature>();

export default ToggleButtonComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'ToggleButton': typeof ToggleButtonComponent;
    'toggle-button': typeof ToggleButtonComponent;
  }
}
