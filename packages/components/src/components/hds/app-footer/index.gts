/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import HdsYield from '../yield/index.gts';
import HdsAppFooterStatusLink from './status-link.gts';
import HdsAppFooterCopyright from './copyright.gts';
import HdsAppFooterLink from './link.gts';
import HdsAppFooterLegalLinks from './legal-links.gts';
import HdsAppFooterItem from './item.gts';

import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../yield/index.gts';
import type { HdsAppFooterItemSignature } from './item.gts';
import type { HdsAppFooterLegalLinksSignature } from './legal-links.gts';
import type { HdsAppFooterLinkSignature } from './link.gts';
import type { HdsAppFooterStatusLinkSignature } from './status-link.gts';
import type { HdsAppFooterThemeTypes } from './types.ts';

export interface HdsAppFooterSignature {
  Args: {
    ariaLabel?: string;
    copyrightYear?: string;
    theme?: HdsAppFooterThemeTypes;
  };
  Blocks: {
    default: [
      {
        ExtraBefore?: ComponentLike<HdsYieldSignature>;
        StatusLink?: ComponentLike<HdsAppFooterStatusLinkSignature>;
        LegalLinks?: ComponentLike<HdsAppFooterLegalLinksSignature>;
        Link?: ComponentLike<HdsAppFooterLinkSignature>;
        Item?: ComponentLike<HdsAppFooterItemSignature>;
        ExtraAfter?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAppFooter extends Component<HdsAppFooterSignature> {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Footer items'
   */
  get ariaLabel(): string {
    return this.args.ariaLabel ?? 'Footer items';
  }

  /**
   * @param theme
   * @type {HdsAppFooterThemeTypes}
   * @description The component theme
   * @default 'light'
   */
  get theme(): HdsAppFooterThemeTypes {
    return this.args.theme ?? 'light';
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-app-footer'];

    // add a class based on the @theme argument
    classes.push(`hds-app-footer--theme-${this.theme}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{yield (hash ExtraBefore=HdsYield)}}
      <ul class="hds-app-footer__list" aria-label={{this.ariaLabel}}>
        {{yield (hash StatusLink=HdsAppFooterStatusLink)}}
        {{yield
          (hash
            Link=HdsAppFooterLink
            LegalLinks=HdsAppFooterLegalLinks
            Item=HdsAppFooterItem
          )
        }}
      </ul>
      {{yield (hash ExtraAfter=HdsYield)}}
      <HdsAppFooterCopyright @year={{@copyrightYear}} />
    </div>
  </template>
}
