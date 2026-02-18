/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

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

const NOOP = () => {};

export default class HdsBreadcrumb extends Component<HdsBreadcrumbSignature> {
  get didInsert(): () => void {
    const { didInsert } = this.args;

    if (typeof didInsert === 'function') {
      return didInsert;
    } else {
      return NOOP;
    }
  }

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

  <template>
    <nav class={{this.classNames}} aria-label={{this.ariaLabel}} ...attributes>
      <ol class="hds-breadcrumb__list" {{didInsert this.didInsert}}>
        {{yield}}
      </ol>
    </nav>
  </template>
}
