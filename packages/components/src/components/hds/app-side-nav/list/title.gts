/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import Component from '@glimmer/component';
// @ts-expect-error - no types available
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

import HdsAppSideNavListItem from './item.gts';

export interface HdsAppSideNavListTitleSignature {
  Args: {
    didInsertTitle?: (titleId: string) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAppSideNavListTitle extends Component<HdsAppSideNavListTitleSignature> {
  /*  Generate a unique ID for each Title */
  private _titleId = 'title-' + guidFor(this);

  @action
  didInsertTitle(element: HTMLElement): void {
    const { didInsertTitle } = this.args;

    if (typeof didInsertTitle === 'function') {
      didInsertTitle(element.id);
    }
  }

  <template>
    <HdsAppSideNavListItem>
      <div
        class="hds-app-side-nav__list-title hds-typography-body-100 hds-font-weight-semibold"
        id={{this._titleId}}
        {{didInsert this.didInsertTitle}}
        ...attributes
      >{{~yield~}}</div>
    </HdsAppSideNavListItem>
  </template>
}