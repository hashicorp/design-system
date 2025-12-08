/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

import type { LinkTo } from '@ember/routing';

export interface HdsInteractiveSignature {
  Args: {
    href?: string;
    isHrefExternal?: boolean;
    isRouteExternal?: boolean;
    // the arguments and types below are mirroring the ones in LinkTo https://github.com/typed-ember/glint/blob/main/packages/environment-ember-loose/-private/intrinsics/link-to.d.ts#L9
    // because they're not exported we're unable to import them directly from glint
    route?: string;
    models?: unknown[];
    model?: unknown;
    query?: Record<string, unknown>;
    'current-when'?: string | boolean;
    replace?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLAnchorElement | HTMLButtonElement;
}

export default class HdsInteractive extends Component<HdsInteractiveSignature> {
  static linkToExternal: LinkTo | null = null;

  /**
   * Determines if a @href value is "external" (it adds target="_blank" rel="noopener noreferrer")
   *
   * @param linkToExternal
   * @type LinkTo | null
   * @default null
   */
  get linkToExternal(): LinkTo | null {
    const component = HdsInteractive.linkToExternal;
    if (component === null) {
      assert(
        `HdsInteractive: You attempted to use an external link without configuring HDS with an external component. Please add this in your app.js file:

import { HdsInteractive } from '@hashicorp/design-system-components/components';
HdsInteractive.linkToExternal = LinkToExternalComponent;`
      );
    }
    return component;
  }

  /**
   * Determines if a @href value is "external" (it adds target="_blank" rel="noopener noreferrer")
   *
   * @param isHrefExternal
   * @type boolean
   * @default true
   */
  get isHrefExternal(): boolean {
    return this.args.isHrefExternal ?? true;
  }

  /**
   * Determines if a @route value is "external" (uses the LinkToExternal component instead of LinkTo)
   *
   * @param isRouteExternal
   * @type boolean
   * @default false
   */
  get isRouteExternal(): boolean {
    return this.args.isRouteExternal ?? false;
  }

  @action
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === ' ' || event.code === 'Space') {
      (event.target as HTMLElement).click();
    }
  }
}
