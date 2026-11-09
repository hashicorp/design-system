/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
import { modifier } from 'ember-modifier';

import { deferAfterRender } from '../../../utils/hds-defer.ts';

import HdsIcon from '../icon/index.gts';
import type { HdsIconSignature } from '../icon/index.gts';
import HdsBadgeCount from '../badge-count/index.gts';

import type { HdsTabsTabIds, HdsTabsPanelIds } from './types.ts';

export interface HdsTabsTabSignature {
  Args: {
    tabIds?: HdsTabsTabIds;
    panelIds?: HdsTabsPanelIds;
    selectedTabIndex?: number;
    icon?: HdsIconSignature['Args']['name'];
    iconColor?: HdsIconSignature['Args']['color'];
    iconTitle?: HdsIconSignature['Args']['title'];
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

  private _hasSetUpSelectionSync = false;

  private _registerTab = modifier((element: HTMLButtonElement) => {
    const { didInsertNode, willDestroyNode } = this.args;

    // deferred so the parent updates its tracked state (and `@isSelected` is read) outside of rendering
    deferAfterRender((): void => {
      if (typeof didInsertNode === 'function') {
        didInsertNode(element, this.args.isSelected);
      }
    }, this);

    return () => {
      if (typeof willDestroyNode === 'function') {
        willDestroyNode(element);
      }
    };
  });

  private _syncSelection = modifier(
    (
      _element: HTMLButtonElement,
      positional: [count: string | undefined, isSelected: boolean | undefined]
    ) => {
      // the arguments are only read so that the modifier runs again when they change
      positional.forEach(() => {});

      // the initial selection is reported when the tab is registered
      if (!this._hasSetUpSelectionSync) {
        this._hasSetUpSelectionSync = true;
        return;
      }

      deferAfterRender((): void => {
        const { didUpdateNode } = this.args;

        if (
          typeof didUpdateNode === 'function' &&
          this.nodeIndex !== undefined
        ) {
          didUpdateNode(this.nodeIndex, this.args.isSelected);
        }
      }, this);
    }
  );

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
        {{this._registerTab}}
        {{this._syncSelection @count @isSelected}}
        {{on "click" this.onClick}}
        {{on "keyup" this.onKeyUp}}
      >
        {{#if @icon}}
          <HdsIcon
            @name={{@icon}}
            @color={{@iconColor}}
            @title={{@iconTitle}}
            class="hds-tabs__tab-icon"
            {{! Bypass lint rule that "tab" cant have semantic descendants; hdsIcon handles its semantic role internally }}
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
