/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { service } from '@ember/service';

import HdsAppFooterCopyright from './copyright.gts';
import HdsYield from '../yield/index.gts';
import HdsAppFooterStatusLink from './status-link.gts';
import HdsAppFooterLegalLinks from './legal-links.gts';
import HdsAppFooterLink from './link.gts';
import HdsAppFooterItem from './item.gts';

import type HdsIntlService from '../../../services/hds-intl.ts';

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
        ExtraBefore?: typeof HdsYield;
        StatusLink?: typeof HdsAppFooterStatusLink;
        LegalLinks?: typeof HdsAppFooterLegalLinks;
        Link?: typeof HdsAppFooterLink;
        Item?: typeof HdsAppFooterItem;
        ExtraAfter?: typeof HdsYield;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAppFooter extends Component<HdsAppFooterSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  get ariaLabel(): string {
    return (
      this.args.ariaLabel ??
      this.hdsIntl.t('hds.components.app-footer.aria-label', {
        default: 'Footer items',
      })
    );
  }

  get theme(): HdsAppFooterThemeTypes {
    return this.args.theme ?? 'light';
  }

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
