/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import hdsT from '../../../../helpers/hds-t.ts';
import HdsYield from '../../yield/index.gts';
import HdsAppSideNavListItem from './item.gts';
import HdsAppSideNavListBackLink from './back-link.gts';
import HdsAppSideNavListTitle from './title.gts';
import HdsAppSideNavListLink from './link.gts';

export interface HdsAppSideNavListSignature {
  Blocks: {
    default: [
      {
        ExtraBefore?: typeof HdsYield;
        Item?: typeof HdsAppSideNavListItem;
        BackLink?: typeof HdsAppSideNavListBackLink;
        Title?: WithBoundArgs<typeof HdsAppSideNavListTitle, 'didInsertTitle'>;
        Link?: typeof HdsAppSideNavListLink;
        ExtraAfter?: typeof HdsYield;
      },
    ];
  };
  Element: HTMLElement;
}

export default class HdsAppSideNavList extends Component<HdsAppSideNavListSignature> {
  @tracked private _titleIds: string[] = [];

  get titleIds(): string {
    return this._titleIds.join(' ');
  }

  didInsertTitle = (titleId: string): void => {
    this._titleIds = [...this._titleIds, titleId];
  };

  <template>
    <nav
      class="hds-app-side-nav__list-wrapper"
      aria-label={{hdsT
        "hds.components.app-side-nav.list.aria-label"
        default="Application local"
      }}
      ...attributes
    >
      {{yield (hash ExtraBefore=HdsYield)}}
      <ul
        class="hds-app-side-nav__list"
        role="list"
        aria-labelledby={{this.titleIds}}
      >
        {{yield
          (hash
            Item=HdsAppSideNavListItem
            BackLink=HdsAppSideNavListBackLink
            Title=(component
              HdsAppSideNavListTitle didInsertTitle=this.didInsertTitle
            )
            Link=HdsAppSideNavListLink
          )
        }}
      </ul>
      {{yield (hash ExtraAfter=HdsYield)}}
    </nav>
  </template>
}
