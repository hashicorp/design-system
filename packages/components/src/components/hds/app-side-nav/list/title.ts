/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
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

  private _registerElementId = modifier((element: HTMLElement) => {
    const { didInsertTitle } = this.args;

    if (typeof didInsertTitle === 'function') {
      didInsertTitle(element.id);
    }
  });
}
