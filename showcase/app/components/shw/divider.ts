import templateOnlyComponent from '@ember/component/template-only';

export interface DividerComponentSignature {
  Args: {
    level?: 2;
  };
  Element: HTMLHRElement;
}

const DividerComponent = templateOnlyComponent<DividerComponentSignature>();

export default DividerComponent;
