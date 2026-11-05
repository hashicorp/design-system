/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';

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

  private _setUpTitle = modifier((element: HTMLDivElement) => {
    const { didInsertTitle } = this.args;

    if (typeof didInsertTitle === 'function') {
      didInsertTitle(element.id);
    }
  });

  <template>
    <HdsAppSideNavListItem>
      <div
        class="hds-app-side-nav__list-title hds-typography-body-100 hds-font-weight-semibold"
        id={{this._titleId}}
        {{this._setUpTitle}}
        ...attributes
      >{{~yield~}}</div>
    </HdsAppSideNavListItem>
  </template>
}
