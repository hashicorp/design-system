/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import Component from '@glimmer/component';

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
}
