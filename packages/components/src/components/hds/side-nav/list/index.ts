import templateOnlyComponent from '@ember/component/template-only';

interface ListIndexSignature {
  Args: {};
  Blocks: {
    default: [unknown];
  };
  Element: HTMLElement;
}

const ListIndexComponent =
  templateOnlyComponent<ListIndexSignature>();

export default ListIndexComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'List::Index': typeof ListIndexComponent;
    'list/index': typeof ListIndexComponent;
  }
}
