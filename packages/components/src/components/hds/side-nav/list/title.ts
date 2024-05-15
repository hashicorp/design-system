import templateOnlyComponent from '@ember/component/template-only';

interface ListTitleSignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const ListTitleComponent =
  templateOnlyComponent<ListTitleSignature>();

export default ListTitleComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'List::Title': typeof ListTitleComponent;
    'list/title': typeof ListTitleComponent;
  }
}
