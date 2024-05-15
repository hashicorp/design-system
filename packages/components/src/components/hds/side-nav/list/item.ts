import templateOnlyComponent from '@ember/component/template-only';

interface ListItemSignature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

const ListItemComponent =
  templateOnlyComponent<ListItemSignature>();

export default ListItemComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'List::Item': typeof ListItemComponent;
    'list/item': typeof ListItemComponent;
  }
}
