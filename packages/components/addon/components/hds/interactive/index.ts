/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

interface HdsInteractiveSignature {
  Args: {
    href?: string;
    isHrefExternal?: boolean;
    isRouteExternal?: boolean;
    route?: unknown;
    models?: unknown;
    model?: unknown;
    query?: unknown;
    'current-when'?: unknown;
    replace?: unknown;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLAnchorElement | HTMLButtonElement;
}

export default class HdsInteractiveIndexComponent extends Component<HdsInteractiveSignature> {
  /**
   * Determines if a @href value is "external" (it adds target="_blank" rel="noopener noreferrer")
   *
   * @param isHrefExternal
   * @type boolean
   * @default true
   */
  get isHrefExternal() {
    return this.args.isHrefExternal ?? true;
  }

  /**
   * Determines if a @route value is "external" (uses the LinkToExternal component instead of LinkTo)
   *
   * @param isRouteExternal
   * @type boolean
   * @default false
   */
  get isRouteExternal() {
    return this.args.isRouteExternal ?? false;
  }

  @action
  onKeyUp(event: KeyboardEvent) {
    if (event.key === ' ' || event.code === 'Space') {
      (event.target as HTMLElement).click();
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Hds::Interactive': typeof HdsInteractiveIndexComponent;
    'hds/interactive': typeof HdsInteractiveIndexComponent;
  }
}
