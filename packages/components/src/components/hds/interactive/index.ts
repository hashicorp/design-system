/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

import type { LinkTo } from '@ember/routing';
import { getLinkToExternal } from '../../../utils/hds-link-to-external.ts';

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
  get linkToExternal(): LinkTo | null {
    const component = getLinkToExternal();
    if (component === null) {
      assert(
        `HdsInteractive: You attempted to use an external link without configuring HDS with an external component. Please add this in your app.js file:

import LinkToExternal from 'ember-engines/components/link-to-external';
import { setLinkToExternal } from '@hashicorp/design-system-components/utils/hds-link-to-external';
setLinkToExternal(LinkToExternalComponent);`
      );
    }
    return component;
  }

  get isHrefExternal(): boolean {
    return this.args.isHrefExternal ?? true;
  }

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
