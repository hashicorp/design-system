/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { next, schedule } from '@ember/runloop';

import type { IconName } from '@hashicorp/flight-icons/svg';
import type { HdsTabsTabIds, HdsTabsPanelIds } from './types';

interface SyncValuesModifierSignature {
  Element: HTMLButtonElement;
  Args: {
    Named: {
      isSelected?: boolean;
      count?: HdsTabsTabSignature['Args']['count'];
    };
  };
}

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

  // Determine if the tab is the selected tab
  get isSelected(): boolean {
    return (
      this.nodeIndex !== undefined &&
      this.nodeIndex === this.args.selectedTabIndex
    );
  }

  // Get the ID of the panel coupled/associated with the tab (it's used by the `aria-controls` attribute)
  get coupledPanelId(): string | undefined {
    return this.nodeIndex !== undefined
      ? this.args.panelIds?.[this.nodeIndex]
      : undefined;
  }

  _registerTab = modifier((element: HTMLButtonElement) => {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      const { didInsertNode } = this.args;

      if (typeof didInsertNode === 'function') {
        didInsertNode(element, this.args.isSelected);
      }
    });

    return () => {
      const { willDestroyNode } = this.args;

      if (typeof willDestroyNode === 'function') {
        willDestroyNode(element);
      }
    };
  });

  _syncValues = modifier<SyncValuesModifierSignature>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_element, _positional, { isSelected, ...rest }) => {
      // eslint-disable-next-line ember/no-runloop
      next((): void => {
        const { didUpdateNode } = this.args;

        if (
          typeof didUpdateNode === 'function' &&
          this.nodeIndex !== undefined
        ) {
          didUpdateNode(this.nodeIndex, isSelected);
        }
      });
    }
  );

  @action
  onClick(event: MouseEvent): false | undefined {
    const { onClick } = this.args;

    if (typeof onClick === 'function' && this.nodeIndex !== undefined) {
      onClick(event, this.nodeIndex);
    } else {
      return false;
    }
  }

  @action
  onKeyUp(event: KeyboardEvent): void {
    const { onKeyUp } = this.args;

    if (typeof onKeyUp === 'function' && this.nodeIndex !== undefined) {
      onKeyUp(this.nodeIndex, event);
    }
  }

  get classNames(): string {
    const classes = ['hds-tabs__tab'];

    if (this.isSelected) {
      classes.push(`hds-tabs__tab--is-selected`);
    }

    return classes.join(' ');
  }
}
