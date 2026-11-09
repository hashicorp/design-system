/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert, warn } from '@ember/debug';
import { deferAfterRender, deferToNextTask } from '../../../utils/hds-defer.ts';
import { hash } from '@ember/helper';
import { modifier } from 'ember-modifier';

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
  @tracked private _isControlled: boolean;
  private _selectedTabId?: string;
  private _hasSetUpTabs = false;
  private _hasSetUpIndicatorSync = false;

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

  private _setUpTabs = modifier(() => {
    // deferred so it runs after the tabs and panels, which register themselves once rendering has finished
    deferAfterRender((): void => {
      assert(
        'The number of Tabs must be equal to the number of Panels',
        this._tabNodes.length === this._panelNodes.length
      );

      this._hasSetUpTabs = true;
      this._selectTabById();
      this.setTabIndicator();
    }, this);
  });

  private _updateIndicatorOnChange = modifier(
    (
      _element: HTMLDivElement,
      positional: [
        selectedTabIndex: number,
        isParentVisible: boolean | undefined,
      ]
    ) => {
      // the arguments are only read so that the modifier runs again when they change
      positional.forEach(() => {});

      // the initial indicator is set when the tabs are set up
      if (!this._hasSetUpIndicatorSync) {
        this._hasSetUpIndicatorSync = true;
        return;
      }

      deferAfterRender((): void => {
        this.setTabIndicator();
      }, this);
    }
  );

  private _selectTabById = (): void => {
    if (this._selectedTabId) {
      this.selectedTabIndex = this._tabIds.indexOf(this._selectedTabId);
    }
  };

  didInsertTab = (element: HTMLButtonElement, isSelected?: boolean): void => {
    this._tabNodes = [...this._tabNodes, element];
    this._tabIds = [...this._tabIds, element.id];
    if (isSelected) {
      this._selectedTabId = element.id;

      // a selected tab rendered after the initial setup (e.g. in an `each` loop) updates the selection
      if (this._hasSetUpTabs) {
        this._selectTabById();
      }
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
    deferToNextTask((): void => {
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
    }, this);
  };

  <template>
    {{! template-lint-disable no-invalid-role }}
    <div
      class={{this.classNames}}
      {{this._setUpTabs}}
      {{this._updateIndicatorOnChange this.selectedTabIndex @isParentVisible}}
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
