import templateOnlyComponent from '@ember/component/template-only';

interface ListLinkSignature {
  Args: {
    badge: unknown;
    count: unknown;
    'current-when': unknown;
    hasSubItems: unknown;
    href: unknown;
    icon: unknown;
    isActive: unknown;
    isHrefExternal: unknown;
    isRouteExternal: unknown;
    model: unknown;
    models: unknown;
    query: unknown;
    replace: unknown;
    route: unknown;
    text: unknown;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const ListLinkComponent =
  templateOnlyComponent<ListLinkSignature>();

export default ListLinkComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'List::Link': typeof ListLinkComponent;
    'list/link': typeof ListLinkComponent;
  }
}
