/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert, warn } from '@ember/debug';
import { next, schedule } from '@ember/runloop';
import type { ComponentLike } from '@glint/template';
import type { HdsTabsPanelSignature } from './panel';
import type { HdsTabsTabSignature } from './tab';
import type { HdsTabsSizeValues } from './types';

export const DEFAULT_SIZE = 'medium';
export const SIZES = ['medium', 'large'];

interface HdsTabsIndexSignature {
  Args: {
    isParentVisible?: boolean;
    selectedTabIndex?: number;
    size?: HdsTabsSizeValues;
    onClickTab?: (event: MouseEvent, tabIndex: number) => void;
  };
  Blocks: {
    default: [
      {
        Panel: ComponentLike<HdsTabsPanelSignature>;
        Tab: ComponentLike<HdsTabsTabSignature>;
      }
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsTabsIndexComponent extends Component<HdsTabsIndexSignature> {
  @tracked tabNodes: HTMLButtonElement[] = [];
  @tracked tabIds: string[] = [];
  @tracked panelNodes: HTMLElement[] = [];
  @tracked panelIds: string[] = [];
  @tracked _selectedTabIndex = this.args.selectedTabIndex ?? 0;
  @tracked selectedTabId?: string;
  @tracked isControlled = false;

  /**
   * Sets the size of Tabs
   * Accepted values: medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Tabs" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  constructor(
    owner: HdsTabsIndexComponent,
    args: HdsTabsIndexSignature['Args']
  ) {
    super(owner, args);

    // this is to determine if the "selected" tab logic is controlled in the consumers' code or is maintained as an internal state
    this.isControlled = this.args.selectedTabIndex !== undefined;
  }

  get selectedTabIndex() {
    if (this.isControlled) {
      assert(
        `@selectedTabIndex for "Hds::Tabs" must be provided is @isControlled is true: ${SIZES.join(
          ', '
        )}; received: ${this.args.selectedTabIndex}`,
        this.args.selectedTabIndex !== undefined
      );

      return this.args.selectedTabIndex;
    } else {
      return this._selectedTabIndex;
    }
  }

  set selectedTabIndex(value) {
    if (this.isControlled) {
      // noop
    } else {
      this._selectedTabIndex = value ?? 0;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-tabs'];

    // add a class based on the @size argument
    classes.push(`hds-tabs--size-${this.size}`);

    return classes.join(' ');
  }

  @action
  didInsert() {
    assert(
      'The number of Tabs must be equal to the number of Panels',
      this.tabNodes.length === this.panelNodes.length
    );

    if (this.selectedTabId) {
      this.selectedTabIndex = this.tabIds.indexOf(this.selectedTabId);
    }

    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }

  @action
  didUpdateSelectedTabIndex() {
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }

  @action
  didUpdateSelectedTabId() {
    // if the selected tab is set dynamically (eg. in a `each` loop)
    // the `Tab` nodes will be re-inserted/rendered, which means the `this.selectedTabId` variable changes
    // but the parent `Tabs` component has already been rendered/inserted but doesn't re-render
    // so the value of the `selectedTabIndex` is not updated, unless we trigger a recalculation
    // using the `did-update` modifier that checks for changes in the `this.selectedTabId` variable
    if (this.selectedTabId) {
      this.selectedTabIndex = this.tabIds.indexOf(this.selectedTabId);
    }
  }

  @action
  didUpdateParentVisibility() {
    schedule('afterRender', () => {
      this.setTabIndicator();
    });
  }

  @action
  didInsertTab(element: HTMLButtonElement, isSelected?: boolean) {
    this.tabNodes = [...this.tabNodes, element];
    this.tabIds = [...this.tabIds, element.id];
    if (isSelected) {
      this.selectedTabId = element.id;
    }
  }

  @action
  didUpdateTab(tabIndex: number, isSelected?: boolean) {
    if (isSelected) {
      this.selectedTabIndex = tabIndex;
    }
    this.setTabIndicator();
  }

  @action
  willDestroyTab(element: HTMLButtonElement) {
    this.tabNodes = this.tabNodes.filter((node) => node.id !== element.id);
    this.tabIds = this.tabIds.filter((tabId) => tabId !== element.id);
  }

  @action
  didInsertPanel(element: HTMLElement, panelId: string) {
    this.panelNodes = [...this.panelNodes, element];
    this.panelIds = [...this.panelIds, panelId];
  }

  @action
  willDestroyPanel(element: HTMLElement) {
    this.panelNodes = this.panelNodes.filter((node) => node.id !== element.id);
    this.panelIds = this.panelIds.filter((panelId) => panelId !== element.id);
  }

  @action
  onClick(event: MouseEvent, tabIndex: number) {
    this.selectedTabIndex = tabIndex;
    this.setTabIndicator();

    // invoke the callback function if it's provided as argument
    if (typeof this.args.onClickTab === 'function') {
      this.args.onClickTab(event, tabIndex);
    }
  }

  @action
  onKeyUp(tabIndex: number, event: KeyboardEvent) {
    const leftArrow = 'ArrowLeft';
    const rightArrow = 'ArrowRight';
    const enterKey = 'Enter';
    const spaceKey = ' ';

    if (event.key === rightArrow) {
      const nextTabIndex = (tabIndex + 1) % this.tabIds.length;
      this.focusTab(nextTabIndex, event);
    } else if (event.key === leftArrow) {
      const prevTabIndex =
        (tabIndex + this.tabIds.length - 1) % this.tabIds.length;
      this.focusTab(prevTabIndex, event);
    } else if (event.key === enterKey || event.key === spaceKey) {
      this.selectedTabIndex = tabIndex;
    }
    // scroll selected tab into view (it may be out of view when activated using a keyboard with `prev/next`)
    (
      this.tabNodes[this.selectedTabIndex]?.parentNode as HTMLElement
    ).scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }

  // Focus tab for keyboard & mouse navigation:
  focusTab(tabIndex: number, event: KeyboardEvent) {
    event.preventDefault();
    this.tabNodes[tabIndex]?.focus();
  }

  setTabIndicator() {
    next(() => {
      const tabElem = this.tabNodes[this.selectedTabIndex];

      if (tabElem != null) {
        const tabsParentElem = tabElem.closest(
          '.hds-tabs__tablist'
        ) as HTMLElement;
        const tabElemParentNode = tabElem.parentNode as HTMLElement;

        // this condition is `null` if any of the parents has `display: none`
        if (tabElemParentNode.offsetParent) {
          const tabLeftPos = tabElemParentNode.offsetLeft;
          const tabWidth = tabElemParentNode.offsetWidth;

          // Set CSS custom properties for indicator
          tabsParentElem.style.setProperty(
            '--indicator-left-pos',
            tabLeftPos + 'px'
          );
          tabsParentElem.style.setProperty(
            '--indicator-width',
            tabWidth + 'px'
          );
        }
      } else {
        let message = '';
        message +=
          '"Hds::Tabs" has tried to set the indicator for an element that doesn\'t exist';
        if (this.tabNodes.length === 0) {
          message +=
            ' (the array `this.tabNodes` is empty, there are no tabs, probably already destroyed)';
        } else {
          message += ` (the value ${
            this.selectedTabIndex
          } of \`this.selectedTabIndex\` is out of bound for the array \`this.tabNodes\`, whose index range is [0 - ${
            this.tabNodes.length - 1
          }])`;
        }
        // https://api.emberjs.com/ember/5.3/classes/@ember%2Fdebug/methods/warn?anchor=warn
        warn(message, true, {
          id: 'hds-debug.tabs.setTabIndicator-tabElem-not-available',
        });
      }
    });
  }
}
