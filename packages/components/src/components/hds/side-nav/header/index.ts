import templateOnlyComponent from '@ember/component/template-only';

interface HeaderIndexSignature {
  Args: {};
  Blocks: {
    actions: [];
    logo: [];
  };
  Element: HTMLDivElement;
}

const HeaderIndexComponent =
  templateOnlyComponent<HeaderIndexSignature>();

export default HeaderIndexComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Header::Index': typeof HeaderIndexComponent;
    'header/index': typeof HeaderIndexComponent;
  }
}
