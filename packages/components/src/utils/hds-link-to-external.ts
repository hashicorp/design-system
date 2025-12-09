import type { LinkTo } from '@ember/routing';

let LINK_TO_EXTERNAL_COMPONENT: LinkTo | null = null;

export function getLinkToExternal(): LinkTo | null {
  return LINK_TO_EXTERNAL_COMPONENT;
}

export function setLinkToExternal(component: LinkTo | null): void {
  LINK_TO_EXTERNAL_COMPONENT = component;
}
