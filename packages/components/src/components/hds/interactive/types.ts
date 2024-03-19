export interface HdsInteractiveArgs {
  href?: string;
  isHrefExternal?: boolean;
  isRouteExternal?: boolean;
  route?: string;
  models?: Array<string | number>;
  model?: string | number;
  query?: Record<string, string>;
  'current-when'?: string;
  replace?: boolean;
}

export interface HdsInteractiveSignature {
  Args: HdsInteractiveArgs;
  Blocks: {
    default: [];
  };
  Element: HTMLAnchorElement | HTMLButtonElement;
}
