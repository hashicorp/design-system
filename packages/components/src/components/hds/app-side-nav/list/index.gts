/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';

import HdsYield from '../../yield/index.gts';
import HdsAppSideNavListItem from './item.gts';
import HdsAppSideNavListBackLink from './back-link.gts';
import HdsAppSideNavListTitle from './title.gts';
import HdsAppSideNavListLink from './link.gts';

import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../../yield/index.gts';
import type { HdsAppSideNavListItemSignature } from './item.gts';
import type { HdsAppSideNavListBackLinkSignature } from './back-link.gts';
import type { HdsAppSideNavListTitleSignature } from './title.gts';
import type { HdsAppSideNavListLinkSignature } from './link.gts';

export interface HdsAppSideNavListSignature {
  Blocks: {
    default: [
      {
        ExtraBefore?: ComponentLike<HdsYieldSignature>;
        Item?: ComponentLike<HdsAppSideNavListItemSignature>;
        BackLink?: ComponentLike<HdsAppSideNavListBackLinkSignature>;
        Title?: ComponentLike<HdsAppSideNavListTitleSignature>;
        Link?: ComponentLike<HdsAppSideNavListLinkSignature>;
        ExtraAfter?: ComponentLike<HdsYieldSignature>;
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

  @action
  didInsertTitle(titleId: string): void {
    this._titleIds = [...this._titleIds, titleId];
  }

  <template>
    <nav
      class="hds-app-side-nav__list-wrapper"
      aria-labelledby="hds-app-side-nav-header"
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
