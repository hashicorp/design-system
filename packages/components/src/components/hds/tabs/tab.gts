/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didUpdate from '@ember/render-modifiers/modifiers/did-update';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';

import type { IconName } from '@hashicorp/flight-icons/svg';

import HdsIcon from '../icon/index.gts';
import HdsBadgeCount from '../badge-count/index.gts';

import type { HdsTabsTabIds, HdsTabsPanelIds } from './types.ts';

export interface HdsTabsTabSignature {
  Args: {
    tabIds?: HdsTabsTabIds;
    panelIds?: HdsTabsPanelIds;
    selectedTabIndex?: number;
    icon?: IconName;
    count?: string;
    isSelected?: boolean;
    didInsertNode?: (element: HTMLButtonElement, isSelected?: boolean) => void;
    didUpdateNode?: (nodeIndex: number, isSelected?: boolean) => void;
    willDestroyNode?: (element: HTMLButtonElement) => void;
    onClick?: (event: MouseEvent, tabIndex: number) => void;
    onKeyUp?: (nodeIndex: number, event: KeyboardEvent) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class HdsTabsTab extends Component<HdsTabsTabSignature> {
  private _tabId = 'tab-' + guidFor(this);

  get nodeIndex(): number | undefined {
    return this.args.tabIds?.indexOf(this._tabId);
  }

  get isSelected(): boolean {
    return (
      this.nodeIndex !== undefined &&
      this.nodeIndex === this.args.selectedTabIndex
    );
  }

  get coupledPanelId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.panelIds?.[this.nodeIndex]
      : undefined;
  }

  didInsertNode = (
    element: HTMLButtonElement,
    positional: [boolean?]
  ): void => {
    const { didInsertNode } = this.args;

    const isSelected = positional[0];

    if (typeof didInsertNode === 'function') {
      didInsertNode(element, isSelected);
    }
  };

  didUpdateNode = (): void => {
    const { didUpdateNode } = this.args;

    if (typeof didUpdateNode === 'function' && this.nodeIndex !== undefined) {
      didUpdateNode(this.nodeIndex, this.args.isSelected);
    }
  };

  willDestroyNode = (element: HTMLButtonElement): void => {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  };

  onClick = (event: MouseEvent): false | undefined => {
    const { onClick } = this.args;

    if (typeof onClick === 'function' && this.nodeIndex !== undefined) {
      onClick(event, this.nodeIndex);
    } else {
      return false;
    }
  };

  onKeyUp = (event: KeyboardEvent): void => {
    const { onKeyUp } = this.args;

    if (typeof onKeyUp === 'function' && this.nodeIndex !== undefined) {
      onKeyUp(this.nodeIndex, event);
    }
  };

  get classNames(): string {
    const classes = ['hds-tabs__tab'];

    if (this.isSelected) {
      classes.push(`hds-tabs__tab--is-selected`);
    }

    return classes.join(' ');
  }

  <template>
    {{! template-lint-disable require-context-role no-invalid-role }}
    <li class={{this.classNames}} ...attributes role="presentation">
      <button
        class="hds-tabs__tab-button"
        role="tab"
        type="button"
        id={{this._tabId}}
        aria-controls={{this.coupledPanelId}}
        aria-selected={{if this.isSelected "true" "false"}}
        tabindex={{unless this.isSelected "-1"}}
        {{didInsert this.didInsertNode @isSelected}}
        {{didUpdate this.didUpdateNode @count @isSelected}}
        {{willDestroy this.willDestroyNode}}
        {{on "click" this.onClick}}
        {{on "keyup" this.onKeyUp}}
      >
        {{#if @icon}}
          <HdsIcon
            @name={{@icon}}
            class="hds-tabs__tab-icon"
            role="presentation"
          />
        {{/if}}

        {{yield}}

        {{#if @count}}
          <HdsBadgeCount
            @text={{@count}}
            @size="small"
            class="hds-tabs__tab-count"
            role="presentation"
          />
        {{/if}}
      </button>
    </li>
    {{! template-lint-enable require-context-role no-invalid-role }}
  </template>
}
