/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../../yield';
import type { HdsSideNavListItemSignature } from './item';
import type { HdsSideNavListBackLinkSignature } from './back-link';
import type { HdsSideNavListTitleSignature } from './title';
import type { HdsSideNavListLinkSignature } from './link';

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
}
