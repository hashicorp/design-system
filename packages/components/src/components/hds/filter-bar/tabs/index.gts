/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { schedule } from '@ember/runloop';
import { modifier } from 'ember-modifier';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import hdsT from '../../../../helpers/hds-t.ts';
import HdsFilterBarTabsTab from './tab.gts';
import HdsFilterBarTabsPanel from './panel.gts';

export interface HdsFilterBarTabsSignature {
  Args: {
    selectedTabIndex?: number;
  };
  Blocks: {
    default: [
      {
        Tab?: WithBoundArgs<
          typeof HdsFilterBarTabsTab,
          | 'selectedTabIndex'
          | 'tabIds'
          | 'panelIds'
          | 'didInsertNode'
          | 'willDestroyNode'
          | 'onClick'
          | 'onKeydown'
        >;
        Panel?: WithBoundArgs<
          typeof HdsFilterBarTabsPanel,
          | 'selectedTabIndex'
          | 'tabIds'
          | 'panelIds'
          | 'didInsertNode'
          | 'willDestroyNode'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFilterBarTabs extends Component<HdsFilterBarTabsSignature> {
  @tracked private _tabIds: string[] = [];
  @tracked private _tabNodes: HTMLElement[] = [];
  @tracked private _panelNodes: HTMLElement[] = [];
  @tracked private _panelIds: string[] = [];
  @tracked private _selectedTabIndex: number = 0;

  private _element!: HTMLDivElement;

  private _setUpFilterBarTabs = modifier((element: HTMLDivElement) => {
    const { selectedTabIndex } = this.args;

    if (selectedTabIndex) {
      this._selectedTabIndex = selectedTabIndex;
    }

    this._element = element;
  });

  didInsertTab = (element: HTMLElement, tabId: string): void => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._tabIds = [...this._tabIds, tabId];
      this._tabNodes = [...this._tabNodes, element];
    });
  };

  willDestroyTab = (element: HTMLElement): void => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._tabNodes = this._tabNodes.filter(
        (node): boolean => node.id !== element.id
      );
      this._tabIds = this._tabIds.filter(
        (tabId): boolean => tabId !== element.id
      );
    });
  };

  didInsertPanel = (element: HTMLElement, panelId: string): void => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._panelIds = [...this._panelIds, panelId];
      this._panelNodes = [...this._panelNodes, element];
    });
  };

  willDestroyPanel = (element: HTMLElement): void => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._panelNodes = this._panelNodes.filter(
        (node): boolean => node.id !== element.id
      );
      this._panelIds = this._panelIds.filter(
        (panelId): boolean => panelId !== element.id
      );
    });
  };

  onClick = (event: MouseEvent, tabIndex: number): void => {
    this._selectedTabIndex = tabIndex;
  };

  onKeydown = (event: KeyboardEvent, tabIndex: number): void => {
    const leftArrow = 'ArrowLeft';
    const rightArrow = 'ArrowRight';
    const upArrow = 'ArrowUp';
    const downArrow = 'ArrowDown';
    const enterKey = 'Enter';
    const spaceKey = ' ';
    const tabKey = 'Tab';

    if (event.key !== tabKey) {
      event.preventDefault();
    }

    if (event.key === rightArrow || event.key === downArrow) {
      const nextTabIndex = (tabIndex + 1) % this._tabIds.length;
      this._focusTab(nextTabIndex, event);
    } else if (event.key === leftArrow || event.key === upArrow) {
      const prevTabIndex =
        (tabIndex + this._tabIds.length - 1) % this._tabIds.length;
      this._focusTab(prevTabIndex, event);
    } else if (event.key === enterKey || event.key === spaceKey) {
      this._selectedTabIndex = tabIndex;
    }
    // scroll selected tab into view (it may be out of view when activated using a keyboard with `prev/next`)
    const parentNode = this._tabNodes[this._selectedTabIndex]?.parentNode;
    if (parentNode instanceof HTMLElement) {
      parentNode.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  };

  // Focus tab for keyboard & mouse navigation:
  private _focusTab = (tabIndex: number, event: KeyboardEvent): void => {
    event.preventDefault();
    this._tabNodes[tabIndex]?.focus();
  };

  <template>
    <div
      class="hds-filter-bar__tabs"
      ...attributes
      {{this._setUpFilterBarTabs}}
    >
      <ol
        class="hds-filter-bar__tabs__list"
        aria-label={{hdsT
          "hds.components.filter-bar.tabs.aria-label"
          default="Filter bar tabs"
        }}
        role="tablist"
      >
        {{yield
          (hash
            Tab=(component
              HdsFilterBarTabsTab
              selectedTabIndex=this._selectedTabIndex
              tabIds=this._tabIds
              panelIds=this._panelIds
              didInsertNode=this.didInsertTab
              willDestroyNode=this.willDestroyTab
              onClick=this.onClick
              onKeydown=this.onKeydown
            )
          )
        }}
      </ol>
      {{yield
        (hash
          Panel=(component
            HdsFilterBarTabsPanel
            selectedTabIndex=this._selectedTabIndex
            tabIds=this._tabIds
            panelIds=this._panelIds
            didInsertNode=this.didInsertPanel
            willDestroyNode=this.willDestroyPanel
          )
        )
      }}
    </div>
  </template>
}
