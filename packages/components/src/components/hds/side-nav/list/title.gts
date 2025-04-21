/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

import HdsSideNavListItem from './item.gts';

export interface HdsSideNavListTitleSignature {
  Args: {
    didInsertTitle?: (titleId: string) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsSideNavListTitle extends Component<HdsSideNavListTitleSignature> {
  /*  Generate a unique ID for each Title */
  titleId = 'title-' + guidFor(this);

  @action
  didInsertTitle(element: HTMLElement): void {
    const { didInsertTitle } = this.args;

    if (typeof didInsertTitle === 'function') {
      didInsertTitle(element.id);
    }
  }

  <template>
    <HdsSideNavListItem>
      <div
        class="hds-side-nav__list-title hds-typography-body-100 hds-font-weight-semibold"
        id={{this.titleId}}
        {{didInsert this.didInsertTitle}}
        ...attributes
      >{{~yield~}}</div>
    </HdsSideNavListItem>
  </template>
}
