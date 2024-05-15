import templateOnlyComponent from '@ember/component/template-only';

interface BaseSignature {
  Args: {};
  Blocks: {
    body: [];
    footer: [];
    header: [];
    root: [];
  };
  Element: HTMLDivElement;
}

const BaseComponent =
  templateOnlyComponent<BaseSignature>();

export default BaseComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Base': typeof BaseComponent;
    'base': typeof BaseComponent;
  }
}
