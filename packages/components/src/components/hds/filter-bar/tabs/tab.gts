/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { modifier, type PositionalArgs } from 'ember-modifier';
import { on } from '@ember/modifier';
import { gt } from 'ember-truth-helpers';

import hdsT from '../../../../helpers/hds-t.ts';
import HdsTextBody from '../../text/body.gts';
import HdsIcon from '../../icon/index.gts';

export interface HdsFilterBarTabsTabModifierSignature {
  Args: {
    insertCallbackFunction?: (element: HTMLButtonElement) => void;
    destroyCallbackFunction?: (element: HTMLButtonElement) => void;
  };
  Element: HTMLButtonElement;
}

export interface HdsFilterBarTabsTabSignature {
  Args: {
    selectedTabIndex?: number;
    tabIds?: string[];
    panelIds?: string[];
    numFilters?: number;
    didInsertNode?: (element: HTMLElement, tabId: string) => void;
    willDestroyNode?: (element: HTMLButtonElement) => void;
    onClick?: (event: MouseEvent, nodeIndex: number) => void;
    onKeydown?: (event: KeyboardEvent, nodeIndex: number) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class HdsFilterBarTabsTab extends Component<HdsFilterBarTabsTabSignature> {
  private _tabId = 'tab-' + guidFor(this);

  private _setUpTab = modifier(
    (
      element: HTMLButtonElement,
      positional: PositionalArgs<HdsFilterBarTabsTabModifierSignature>,
      named: HdsFilterBarTabsTabModifierSignature['Args']
    ) => {
      if (typeof named.insertCallbackFunction === 'function') {
        named.insertCallbackFunction(element);
      }

      return () => {
        if (typeof named.destroyCallbackFunction === 'function') {
          named.destroyCallbackFunction(element);
        }
      };
    }
  );

  get nodeIndex(): number | undefined {
    return this.args.tabIds?.indexOf(this._tabId);
  }

  get coupledPanelId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.panelIds?.[this.nodeIndex]
      : undefined;
  }

  get isSelected(): boolean {
    return (
      this.nodeIndex !== undefined &&
      this.nodeIndex === this.args.selectedTabIndex
    );
  }

  didInsertNode = (element: HTMLButtonElement): void => {
    const { didInsertNode } = this.args;

    if (typeof didInsertNode === 'function') {
      didInsertNode(element, this._tabId);
    }
  };

  willDestroyNode = (element: HTMLButtonElement): void => {
    const { willDestroyNode } = this.args;

    if (typeof willDestroyNode === 'function') {
      willDestroyNode(element);
    }
  };

  onClick = (event: MouseEvent): void => {
    const { onClick } = this.args;

    if (this.nodeIndex !== undefined && typeof onClick === 'function') {
      onClick(event, this.nodeIndex);
    }
  };

  onKeydown = (event: KeyboardEvent): void => {
    const { onKeydown } = this.args;

    if (this.nodeIndex !== undefined && typeof onKeydown === 'function') {
      onKeydown(event, this.nodeIndex);
    }
  };

  get classNames(): string {
    const classes = ['hds-filter-bar__tabs__tab'];

    if (this.isSelected) {
      classes.push(`hds-filter-bar__tabs__tab--is-selected`);
    }

    return classes.join(' ');
  }

  <template>
    {{! template-lint-disable require-context-role no-invalid-role }}
    {{! template-lint-disable require-presentational-children }}
    <li class={{this.classNames}} ...attributes role="presentation">
      <button
        class="hds-filter-bar__tabs__tab__button"
        id={{this._tabId}}
        type="button"
        role="tab"
        aria-controls={{this.coupledPanelId}}
        aria-selected={{if this.isSelected "true" "false"}}
        tabindex={{unless this.isSelected "-1"}}
        {{on "click" this.onClick}}
        {{on "keydown" this.onKeydown}}
        {{this._setUpTab
          insertCallbackFunction=this.didInsertNode
          destroyCallbackFunction=this.willDestroyNode
        }}
      >
        <HdsTextBody
          @size="200"
          @weight="medium"
          class="hds-filter-bar__tabs__tab__text"
        >{{yield}}</HdsTextBody>
        {{#if (gt @numFilters 0)}}
          <span class="sr-only">{{hdsT
              "hds.components.filter-bar.tabs.tab.filters-applied"
              default="Filters applied"
            }}</span>
          <HdsTextBody
            @size="200"
            @color="primary"
            class="hds-filter-bar__tabs__tab__filter-count"
          >
            {{@numFilters}}
          </HdsTextBody>
        {{/if}}
        <HdsIcon
          @name="chevron-right"
          @color="primary"
          class="hds-filter-bar__tabs__tab__icon"
        />
      </button>
    </li>
    {{! template-lint-enable require-presentational-children }}
    {{! template-lint-enable require-context-role no-invalid-role }}
  </template>
}
