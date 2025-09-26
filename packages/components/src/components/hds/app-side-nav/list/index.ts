/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { schedule } from '@ember/runloop';

import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../../yield';
import type { HdsAppSideNavListItemSignature } from './item';
import type { HdsAppSideNavListBackLinkSignature } from './back-link';
import type { HdsAppSideNavListTitleSignature } from './title';
import type { HdsAppSideNavListLinkSignature } from './link';

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

export interface HdsAppSideNavListRegisterTitleIdModifierSignature {
  Element: HdsAppSideNavListSignature['Element'];
}

export default class HdsAppSideNavList extends Component<HdsAppSideNavListSignature> {
  @tracked private _titleIds: string[] = [];

  get titleIds(): string {
    return this._titleIds.join(' ');
  }

  private _registerTitleId =
    modifier<HdsAppSideNavListRegisterTitleIdModifierSignature>((element) => {
      // eslint-disable-next-line ember/no-runloop
      schedule(
        'afterRender',
        () => (this._titleIds = [...this._titleIds, element.id])
      );
    });
}
