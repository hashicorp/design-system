/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import HdsYield from '../../yield/index.gts';
import HdsAppSideNavListBackLink from './back-link.gts';
import HdsAppSideNavListItem from './item.gts';
import HdsAppSideNavListLink from './link.gts';
import HdsAppSideNavListTitle from './title.gts';

import type { ComponentLike } from '@glint/template';
import hdsT from '../../../../helpers/hds-t.ts';
import type { HdsYieldSignature } from '../../yield/index.gts';
import type { HdsAppSideNavListBackLinkSignature } from './back-link.gts';
import type { HdsAppSideNavListItemSignature } from './item.gts';
import type { HdsAppSideNavListLinkSignature } from './link.gts';
import type { HdsAppSideNavListTitleSignature } from './title.gts';

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
      aria-label={{hdsT
        "hds.components.app-side-nav.list.aria-label"
        default="Application local"
      }}
      ...attributes
    >
      {{yield (hash ExtraBefore=(component HdsYield))}}
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
      {{yield (hash ExtraAfter=(component HdsYield))}}
    </nav>
  </template>
}
