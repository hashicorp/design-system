/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';

import type Owner from '@ember/owner';

import {
  HdsTableThSortOrderValues,
  HdsTableThSortOrderLabelValues,
} from './types.ts';
import HdsFormCheckboxBase from '../form/checkbox/base.gts';
import HdsTableThButtonSort from './th-button-sort.gts';
import HdsTableTh from './th.gts';

import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type {
  HdsTableScope,
  HdsTableThSortOrder,
  HdsTableThSortOrderLabels,
} from './types';
import type { HdsTableThSignature } from './th';

export interface HdsTableThSelectableSignature {
  Args: {
    didInsert?: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    isSelected?: boolean;
    onClickSortBySelected?: () => void;
    onSelectionChange?: (
      target: HdsFormCheckboxBaseSignature['Element'],
      selectionKey: string | undefined
    ) => void;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string;
    selectionScope?: HdsTableScope;
    sortBySelectedOrder?: HdsTableThSortOrder;
    willDestroy?: (selectionKey?: string) => void;
  };
  Element: HdsTableThSignature['Element'];
}

export default class HdsTableThSelectable extends Component<HdsTableThSelectableSignature> {
  @tracked isSelected: boolean;
  private _guid = guidFor(this);

  private _checkboxId = `checkbox-${this._guid}`;
  private _labelId = `label-${this._guid}`;

  constructor(owner: Owner, args: HdsTableThSelectableSignature['Args']) {
    super(owner, args);
    this.isSelected = this.args.isSelected ?? false;
  }

  get isSortable(): boolean {
    return this.args.onClickSortBySelected !== undefined;
  }

  get ariaLabel(): string {
    const { selectionAriaLabelSuffix = 'row' } = this.args;
    return `Select ${selectionAriaLabelSuffix}`;
  }

  get ariaSort(): HdsTableThSortOrderLabels | undefined {
    switch (this.args.sortBySelectedOrder) {
      case HdsTableThSortOrderValues.Asc:
        return HdsTableThSortOrderLabelValues.Asc;
      case HdsTableThSortOrderValues.Desc:
        return HdsTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsTableThSortOrderLabelValues.None;
    }
  }

  didInsert = (checkbox: HdsFormCheckboxBaseSignature['Element']): void => {
    const { didInsert } = this.args;
    if (typeof didInsert === 'function') {
      didInsert(checkbox, this.args.selectionKey);
    }
  };

  willDestroyNode = (): void => {
    super.willDestroy();
    const { willDestroy } = this.args;
    if (typeof willDestroy === 'function') {
      willDestroy(this.args.selectionKey);
    }
  };

  onSelectionChange = (event: Event): void => {
    // Assert event.target as HdsFormCheckboxBaseSignature['Element'] to access the 'checked' property
    const target = event.target as HdsFormCheckboxBaseSignature['Element'];
    this.isSelected = target.checked;
    const { onSelectionChange } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(target, this.args.selectionKey);
    }
  };

  <template>
    <HdsTableTh
      class="hds-table__th--is-selectable"
      aria-sort={{if this.isSortable this.ariaSort}}
      @scope={{@selectionScope}}
      ...attributes
    >
      <div class="hds-table__th-content">
        <HdsFormCheckboxBase
          id={{this._checkboxId}}
          class="hds-table__checkbox"
          checked={{@isSelected}}
          aria-label={{this.ariaLabel}}
          {{didInsert this.didInsert}}
          {{willDestroy this.willDestroyNode}}
          {{on "change" this.onSelectionChange}}
        />
        {{#if this.isSortable}}
          <HdsTableThButtonSort
            @sortOrder={{@sortBySelectedOrder}}
            @onClick={{@onClickSortBySelected}}
            @labelId={{this._labelId}}
          />
        {{/if}}
      </div>
    </HdsTableTh>
  </template>
}
