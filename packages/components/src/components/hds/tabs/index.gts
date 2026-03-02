/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert, warn } from '@ember/debug';
import { next, schedule } from '@ember/runloop';
import { hash } from '@ember/helper';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didUpdate from '@ember/render-modifiers/modifiers/did-update';

import type { WithBoundArgs } from '@glint/template';
import type Owner from '@ember/owner';

import { HdsTabsSizeValues } from './types.ts';
import HdsTabsTab from './tab.gts';
import HdsTabsPanel from './panel.gts';

import type { HdsTabsTabSignature } from './tab.gts';
import type { HdsTabsTabIds, HdsTabsPanelIds, HdsTabsSizes } from './types.ts';

export const DEFAULT_SIZE: HdsTabsSizes = 'medium';
export const SIZES: HdsTabsSizes[] = Object.values(HdsTabsSizeValues);

export interface HdsTabsSignature {
  Args: {
    size?: HdsTabsSizes;
    onClickTab?: (event: MouseEvent, tabIndex: number) => void;
    selectedTabIndex?: HdsTabsTabSignature['Args']['selectedTabIndex'];
    isParentVisible?: boolean;
  };
  Blocks: {
    default: [
      {
        Tab?: WithBoundArgs<
          typeof HdsTabsTab,
          | 'selectedTabIndex'
          | 'tabIds'
          | 'panelIds'
          | 'onClick'
          | 'onKeyUp'
          | 'didInsertNode'
          | 'didUpdateNode'
          | 'willDestroyNode'
        >;
        Panel?: WithBoundArgs<
          typeof HdsTabsPanel,
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

export default class HdsTabs extends Component<HdsTabsSignature> {
  @tracked private _tabNodes: HTMLButtonElement[] = [];
  @tracked private _tabIds: HdsTabsTabIds = [];
  @tracked private _panelNodes: HTMLElement[] = [];
  @tracked private _panelIds: HdsTabsPanelIds = [];
  @tracked private _selectedTabIndex;
  @tracked private _selectedTabId?: string;
  @tracked private _isControlled: boolean;

  get size(): HdsTabsSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Tabs" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  constructor(owner: Owner, args: HdsTabsSignature['Args']) {
    super(owner, args);

    // this is to determine if the "selected" tab logic is controlled in the consumers' code or is maintained as an internal state
    this._isControlled = this.args.selectedTabIndex !== undefined;
    this._selectedTabIndex = this.args.selectedTabIndex ?? 0;
  }

  get selectedTabIndex(): number {
    if (this._isControlled) {
      return this.args.selectedTabIndex!;
    } else {
      return this._selectedTabIndex;
    }
  }

  set selectedTabIndex(value) {
    if (this._isControlled) {
      // noop
    } else {
      this._selectedTabIndex = value;
    }
  }

  get classNames(): string {
    const classes = ['hds-tabs'];

    // add a class based on the @size argument
    classes.push(`hds-tabs--size-${this.size}`);

    return classes.join(' ');
  }

  didInsert = (): void => {
    assert(
      'The number of Tabs must be equal to the number of Panels',
      this._tabNodes.length === this._panelNodes.length
    );

    if (this._selectedTabId) {
      this.selectedTabIndex = this._tabIds.indexOf(this._selectedTabId);
    }

    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this.setTabIndicator();
    });
  };

  didUpdateSelectedTabIndex = (): void => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this.setTabIndicator();
    });
  };

  didUpdateSelectedTabId = (): void => {
    // if the selected tab is set dynamically (eg. in a `each` loop)
    // the `Tab` nodes will be re-inserted/rendered, which means the `this.selectedTabId` variable changes
    // but the parent `Tabs` component has already been rendered/inserted but doesn't re-render
    // so the value of the `selectedTabIndex` is not updated, unless we trigger a recalculation
    // using the `did-update` modifier that checks for changes in the `this.selectedTabId` variable
    if (this._selectedTabId) {
      this.selectedTabIndex = this._tabIds.indexOf(this._selectedTabId);
    }
  };

  didUpdateParentVisibility = (): void => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this.setTabIndicator();
    });
  };

  didInsertTab = (element: HTMLButtonElement, isSelected?: boolean): void => {
    this._tabNodes = [...this._tabNodes, element];
    this._tabIds = [...this._tabIds, element.id];
    if (isSelected) {
      this._selectedTabId = element.id;
    }
  };

  didUpdateTab = (tabIndex: number, isSelected?: boolean): void => {
    if (isSelected) {
      this.selectedTabIndex = tabIndex;
    }
    this.setTabIndicator();
  };

  willDestroyTab = (element: HTMLButtonElement): void => {
    this._tabNodes = this._tabNodes.filter(
      (node): boolean => node.id !== element.id
    );
    this._tabIds = this._tabIds.filter(
      (tabId): boolean => tabId !== element.id
    );
  };

  didInsertPanel = (element: HTMLElement, panelId: string): void => {
    this._panelNodes = [...this._panelNodes, element];
    this._panelIds = [...this._panelIds, panelId];
  };

  willDestroyPanel = (element: HTMLElement): void => {
    this._panelNodes = this._panelNodes.filter(
      (node): boolean => node.id !== element.id
    );
    this._panelIds = this._panelIds.filter(
      (panelId): boolean => panelId !== element.id
    );
  };

  onClick = (event: MouseEvent, tabIndex: number): void => {
    this.selectedTabIndex = tabIndex;
    this.setTabIndicator();

    // invoke the callback function if it's provided as argument
    if (typeof this.args.onClickTab === 'function') {
      this.args.onClickTab(event, tabIndex);
    }
  };

  onKeyUp = (tabIndex: number, event: KeyboardEvent): void => {
    const leftArrow = 'ArrowLeft';
    const rightArrow = 'ArrowRight';
    const enterKey = 'Enter';
    const spaceKey = ' ';

    if (event.key === rightArrow) {
      const nextTabIndex = (tabIndex + 1) % this._tabIds.length;
      this.focusTab(nextTabIndex, event);
    } else if (event.key === leftArrow) {
      const prevTabIndex =
        (tabIndex + this._tabIds.length - 1) % this._tabIds.length;
      this.focusTab(prevTabIndex, event);
    } else if (event.key === enterKey || event.key === spaceKey) {
      this.selectedTabIndex = tabIndex;
    }
    // scroll selected tab into view (it may be out of view when activated using a keyboard with `prev/next`)
    const parentNode = this._tabNodes[this.selectedTabIndex]?.parentNode;
    if (parentNode instanceof HTMLElement) {
      parentNode.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  };

  // Focus tab for keyboard & mouse navigation:
  focusTab = (tabIndex: number, event: KeyboardEvent): void => {
    event.preventDefault();
    this._tabNodes[tabIndex]?.focus();
  };

  setTabIndicator = (): void => {
    // eslint-disable-next-line ember/no-runloop
    next((): void => {
      const tabElem = this._tabNodes[this.selectedTabIndex];

      if (tabElem != null) {
        const tabElemParentNode = tabElem.parentNode as HTMLElement;
        const tabsElemClosestList = tabElem.closest(
          '.hds-tabs__tablist'
        ) as HTMLElement;

        // this condition is `null` if any of the parents has `display: none`
        if (tabElemParentNode.offsetParent) {
          const tabLeftPos = tabElemParentNode.offsetLeft;
          const tabWidth = tabElemParentNode.offsetWidth;

          // Set CSS custom properties for indicator
          tabsElemClosestList.style.setProperty(
            '--indicator-left-pos',
            tabLeftPos + 'px'
          );
          tabsElemClosestList.style.setProperty(
            '--indicator-width',
            tabWidth + 'px'
          );
        }
      } else {
        let message = '';
        message +=
          '"Hds::Tabs" has tried to set the indicator for an element that doesn\'t exist';
        if (this._tabNodes.length === 0) {
          message +=
            ' (the array `this._tabNodes` is empty, there are no tabs, probably already destroyed)';
        } else {
          message += ` (the value ${
            this.selectedTabIndex
          } of \`this.selectedTabIndex\` is out of bound for the array \`this._tabNodes\`, whose index range is [0 - ${
            this._tabNodes.length - 1
          }])`;
        }
        // https://api.emberjs.com/ember/5.3/classes/@ember%2Fdebug/methods/warn?anchor=warn
        warn(message, true, {
          id: 'hds-debug.tabs.setTabIndicator-tabElem-not-available',
        });
      }
    });
  };

  <template>
    {{! template-lint-disable no-invalid-role }}
    <div
      class={{this.classNames}}
      {{didInsert this.didInsert}}
      {{didUpdate this.didUpdateSelectedTabIndex this.selectedTabIndex}}
      {{didUpdate this.didUpdateSelectedTabId this._selectedTabId}}
      {{didUpdate this.didUpdateParentVisibility @isParentVisible}}
      ...attributes
    >
      <div class="hds-tabs__tablist-wrapper">
        <ul class="hds-tabs__tablist" role="tablist">
          {{yield
            (hash
              Tab=(component
                HdsTabsTab
                didInsertNode=this.didInsertTab
                didUpdateNode=this.didUpdateTab
                willDestroyNode=this.willDestroyTab
                tabIds=this._tabIds
                panelIds=this._panelIds
                selectedTabIndex=this.selectedTabIndex
                onClick=this.onClick
                onKeyUp=this.onKeyUp
              )
            )
          }}
          <li class="hds-tabs__tab-indicator" role="presentation"></li>
        </ul>
      </div>

      {{yield
        (hash
          Panel=(component
            HdsTabsPanel
            didInsertNode=this.didInsertPanel
            willDestroyNode=this.willDestroyPanel
            tabIds=this._tabIds
            panelIds=this._panelIds
            selectedTabIndex=this.selectedTabIndex
          )
        )
      }}
    </div>
    {{! template-lint-enable no-invalid-role }}
  </template>
}
