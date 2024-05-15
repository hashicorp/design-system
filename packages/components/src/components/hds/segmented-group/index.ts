import templateOnlyComponent from '@ember/component/template-only';

interface IndexSignature {
  Args: {};
  Blocks: {
    default: [unknown];
  };
  Element: HTMLDivElement;
}

const IndexComponent =
  templateOnlyComponent<IndexSignature>();

export default IndexComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Index': typeof IndexComponent;
    'index': typeof IndexComponent;
  }
}
