/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { modifier } from 'ember-modifier';

import { deferAfterRender } from '../../../utils/hds-defer.ts';

import type HdsIntlService from '../../../services/hds-intl';

export interface HdsBreadcrumbSignature {
  Args: {
    ariaLabel?: string;
    itemsCanWrap?: boolean;
    didInsert?: (element: HTMLOListElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsBreadcrumb extends Component<HdsBreadcrumbSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  private _hasCalledDidInsert = false;

  private _setUpList = modifier((element: HTMLOListElement) => {
    // a new `@didInsert` function re-runs this modifier, `@didInsert` is still called only once
    if (this._hasCalledDidInsert) {
      return;
    }

    this._hasCalledDidInsert = true;

    const { didInsert } = this.args;

    if (typeof didInsert === 'function') {
      // deferred so the consumer callback runs outside of rendering, where it can read and update tracked state
      deferAfterRender((): void => didInsert(element), this);
    }
  });

  get itemsCanWrap(): boolean {
    return this.args.itemsCanWrap ?? true;
  }

  get ariaLabel(): string {
    return (
      this.args.ariaLabel ??
      this.hdsIntl.t('hds.components.breadcrumb.aria-label', {
        default: 'breadcrumbs',
      })
    );
  }

  get classNames(): string {
    const classes = ['hds-breadcrumb'];

    // add a class based on the @itemsCanWrap argument
    if (this.itemsCanWrap) {
      classes.push('hds-breadcrumb--items-can-wrap');
    }

    return classes.join(' ');
  }

  <template>
    <nav class={{this.classNames}} aria-label={{this.ariaLabel}} ...attributes>
      <ol class="hds-breadcrumb__list" {{this._setUpList}}>
        {{yield}}
      </ol>
    </nav>
  </template>
}
