/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

export interface HdsBreadcrumbSignature {
  Args: {
    ariaLabel?: string;
    itemsCanWrap?: boolean;
    didInsert?: () => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsBreadcrumb extends Component<HdsBreadcrumbSignature> {
  get itemsCanWrap(): boolean {
    return this.args.itemsCanWrap ?? true;
  }

  get ariaLabel(): string {
    return this.args.ariaLabel ?? 'breadcrumbs';
  }

  get classNames(): string {
    const classes = ['hds-breadcrumb'];

    // add a class based on the @itemsCanWrap argument
    if (this.itemsCanWrap) {
      classes.push('hds-breadcrumb--items-can-wrap');
    }

    return classes.join(' ');
  }

  private _callDidInsert = modifier(() => {
    const { didInsert } = this.args;

    if (typeof didInsert === 'function') {
      didInsert();
    }
  });
}
