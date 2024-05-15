import templateOnlyComponent from '@ember/component/template-only';

interface ListBackLinkSignature {
  Args: {
    'current-when': unknown;
    href: unknown;
    isHrefExternal: unknown;
    isRouteExternal: unknown;
    model: unknown;
    models: unknown;
    query: unknown;
    replace: unknown;
    route: unknown;
    text: unknown;
  };
  Element: HTMLElement;
}

const ListBackLinkComponent =
  templateOnlyComponent<ListBackLinkSignature>();

export default ListBackLinkComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'List::BackLink': typeof ListBackLinkComponent;
    'list/back-link': typeof ListBackLinkComponent;
  }
}
