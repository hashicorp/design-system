/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { hdsResolveLinkToExternal } from '../../../utils/hds-resolve-link-to-external.ts';

import type Owner from '@ember/owner';
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
  @tracked linkToExternal: LinkTo | null = null;

  constructor(owner: Owner, args: HdsInteractiveSignature['Args']) {
    super(owner, args);

    // we want to avoid resolving the component if it's not needed
    if (args.isRouteExternal) {
      this.resolveLinkToExternal();
    }
  }

  resolveLinkToExternal() {
    this.linkToExternal = hdsResolveLinkToExternal(this.args.isRouteExternal);
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
