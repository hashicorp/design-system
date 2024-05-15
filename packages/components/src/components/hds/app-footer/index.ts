/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../yield';
import type HdsAppFooterItemSignature from './legal-links';
import type HdsAppFooterLegalLinksSignature from './legal-links';
import type HdsAppFooterLinkSignature from './link';
import type HdsAppFooterStatusLinkSignature from './status-link';

export interface HdsAppFooterSignature {
  Args: {
    ariaLabel?: string;
    copyrightYear?: string;
    theme?: string;
  };
  Blocks: {
    default: [
      {
        ExtraBefore?: ComponentLike<HdsYieldSignature>;
        Item?: ComponentLike<HdsAppFooterItemSignature>;
        LegalLinks?: ComponentLike<HdsAppFooterLegalLinksSignature>;
        Link?: ComponentLike<HdsAppFooterLinkSignature>;
        StatusLink?: ComponentLike<HdsAppFooterStatusLinkSignature>;
        ExtraAfter?: ComponentLike<HdsYieldSignature>;
      }
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAppFooterIndexComponent extends Component<HdsAppFooterSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Footer items'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Footer items';
  }

  /**
   * @param theme
   * @type {string}
   * @description The component theme
   * @default 'light'
   */
  get theme() {
    return this.args.theme ?? 'light';
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-app-footer'];

    // add a class based on the @theme argument
    classes.push(`hds-app-footer--theme-${this.theme}`);

    return classes.join(' ');
  }
}
