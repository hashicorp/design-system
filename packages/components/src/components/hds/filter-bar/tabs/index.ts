/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { modifier } from 'ember-modifier';
import type { WithBoundArgs } from '@glint/template';
import HdsFilterBarTabsTabComponent from './tab.ts';
import HdsFilterBarTabsPanelComponent from './panel.ts';

const TAB_ELEMENT_SELECTOR = '.hds-filter-bar__tabs__tab__button';
const PANEL_ELEMENT_SELECTOR = '.hds-filter-bar__tabs__panel';

export interface HdsFilterBarTabsSignature {
  Args: {
    selectedTabIndex?: number;
    ariaLabel: string;
    onClickTab?: (event: MouseEvent, tabIndex: number) => void;
  };
  Blocks: {
    default: [
      {
        Tab?: WithBoundArgs<
          typeof HdsFilterBarTabsTabComponent,
          | 'selectedTabIndex'
          | 'tabIds'
          | 'panelIds'
          | 'didInsertNode'
          | 'willDestroyNode'
          | 'onClick'
          | 'onKeyUp'
        >;
        Panel?: WithBoundArgs<
          typeof HdsFilterBarTabsPanelComponent,
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
  @tracked private _selectedTabId?: string;

  private _element!: HTMLDivElement;

  private _setUpFilterBarTabs = modifier((element: HTMLDivElement) => {
    const { selectedTabIndex } = this.args;

    if (selectedTabIndex) {
      this._selectedTabIndex = selectedTabIndex;
    }

    this._element = element;

    return () => {};
  });

  @action
  didInsertTab(): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this.updateTabs();
    });
  }

  @action
  willDestroyTab(element: HTMLElement): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._tabNodes = this._tabNodes.filter(
        (node): boolean => node.id !== element.id
      );
      this._tabIds = this._tabIds.filter(
        (tabId): boolean => tabId !== element.id
      );
    });
  }

  @action
  didInsertPanel(): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this.updatePanels();
    });
  }

  @action
  willDestroyPanel(element: HTMLElement): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._panelNodes = this._panelNodes.filter(
        (node): boolean => node.id !== element.id
      );
      this._panelIds = this._panelIds.filter(
        (panelId): boolean => panelId !== element.id
      );
    });
  }

  @action
  onClick(event: MouseEvent, tabIndex: number): void {
    this._selectedTabIndex = tabIndex;

    // invoke the callback function if it's provided as argument
    if (typeof this.args.onClickTab === 'function') {
      this.args.onClickTab(event, tabIndex);
    }
  }

  @action
  onKeyUp(event: KeyboardEvent, tabIndex: number): void {
    const leftArrow = 'ArrowLeft';
    const rightArrow = 'ArrowRight';
    const upArrow = 'ArrowUp';
    const downArrow = 'ArrowDown';
    const enterKey = 'Enter';
    const spaceKey = ' ';

    if (event.key === rightArrow || event.key === downArrow) {
      const nextTabIndex = (tabIndex + 1) % this._tabIds.length;
      this.focusTab(nextTabIndex, event);
    } else if (event.key === leftArrow || event.key === upArrow) {
      const prevTabIndex =
        (tabIndex + this._tabIds.length - 1) % this._tabIds.length;
      this.focusTab(prevTabIndex, event);
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
  }

  // Focus tab for keyboard & mouse navigation:
  focusTab(tabIndex: number, event: KeyboardEvent): void {
    event.preventDefault();
    this._tabNodes[tabIndex]?.focus();
  }

  // Update the tab arrays based on how they are ordered in the DOM
  private updateTabs(): void {
    const tabs = this._element.querySelectorAll(TAB_ELEMENT_SELECTOR);
    let newTabIds: string[] = [];
    let newTabNodes: HTMLElement[] = [];
    tabs.forEach((tab) => {
      newTabIds = [...newTabIds, tab.id];
      newTabNodes = [...newTabNodes, tab as HTMLElement];
    });
    this._tabIds = newTabIds;
    this._tabNodes = newTabNodes;
  }

  // Update the panel arrays based on how they are ordered in the DOM
  private updatePanels(): void {
    const panels = this._element.querySelectorAll(PANEL_ELEMENT_SELECTOR);
    let newPanelIds: string[] = [];
    let newPanelNodes: HTMLElement[] = [];
    panels.forEach((panel) => {
      newPanelIds = [...newPanelIds, panel.id];
      newPanelNodes = [...newPanelNodes, panel as HTMLElement];
    });
    this._panelIds = newPanelIds;
    this._panelNodes = newPanelNodes;
  }
}
