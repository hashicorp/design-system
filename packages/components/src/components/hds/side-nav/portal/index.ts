import templateOnlyComponent from '@ember/component/template-only';

interface PortalIndexSignature {
  Args: {
    ariaLabel: unknown;
    targetName: unknown;
  };
  Blocks: {
    default: [unknown];
  };
  Element: HTMLDivElement;
}

const PortalIndexComponent =
  templateOnlyComponent<PortalIndexSignature>();

export default PortalIndexComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Portal::Index': typeof PortalIndexComponent;
    'portal/index': typeof PortalIndexComponent;
  }
}
