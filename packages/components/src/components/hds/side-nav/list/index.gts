/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';

import HdsYield from '../../yield/index.gts';
import HdsSideNavListItem from './item.gts';
import HdsSideNavListBackLink from './back-link.gts';
import HdsSideNavListLink from './link.gts';
import HdsSideNavListTitle from './title.gts';

import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../../yield/index.gts';
import type { HdsSideNavListItemSignature } from './item.gts';
import type { HdsSideNavListBackLinkSignature } from './back-link.gts';
import type { HdsSideNavListTitleSignature } from './title.gts';
import type { HdsSideNavListLinkSignature } from './link.gts';

export interface HdsSideNavListSignature {
  Blocks: {
    default: [
      {
        ExtraBefore?: ComponentLike<HdsYieldSignature>;
        Item?: ComponentLike<HdsSideNavListItemSignature>;
        BackLink?: ComponentLike<HdsSideNavListBackLinkSignature>;
        Title?: ComponentLike<HdsSideNavListTitleSignature>;
        Link?: ComponentLike<HdsSideNavListLinkSignature>;
        ExtraAfter?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HTMLElement;
}

export default class HdsSideNavList extends Component<HdsSideNavListSignature> {
  @tracked _titleIds: string[] = [];

  get titleIds(): string {
    return this._titleIds.join(' ');
  }

  @action
  didInsertTitle(titleId: string): void {
    this._titleIds = [...this._titleIds, titleId];
  }

  <template>
    <nav
      class="hds-side-nav__list-wrapper"
      aria-labelledby="hds-side-nav-header"
      ...attributes
    >
      {{yield (hash ExtraBefore=HdsYield)}}
      <ul
        class="hds-side-nav__list"
        role="list"
        aria-labelledby={{this.titleIds}}
      >
        {{yield
          (hash
            Item=HdsSideNavListItem
            BackLink=HdsSideNavListBackLink
            Title=(component
              HdsSideNavListTitle didInsertTitle=this.didInsertTitle
            )
            Link=HdsSideNavListLink
          )
        }}
      </ul>
      {{yield (hash ExtraAfter=HdsYield)}}
    </nav>
  </template>
}
