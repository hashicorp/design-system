/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { on } from '@ember/modifier';

import HdsIcon from '../icon/index.gts';
import {
  HdsAdvancedTableThExpandIconValues,
  type HdsAdvancedTableExpandState,
} from './types.ts';
import type { HdsAdvancedTableThSortExpandIcons } from './types.ts';

export interface HdsAdvancedTableThButtonExpandSignature {
  Args: {
    labelId?: string;
    isExpanded?: HdsAdvancedTableExpandState;
    onToggle?: () => void;
    isExpandAll?: boolean;
  };
  Element: HTMLButtonElement;
}

export default class HdsAdvancedTableThButtonExpand extends Component<HdsAdvancedTableThButtonExpandSignature> {
  // Generates a unique ID for the (hidden) "label prefix" <span> element
  private _prefixLabelId = 'prefix-' + guidFor(this);

  get isExpanded(): HdsAdvancedTableExpandState {
    const { isExpanded = false } = this.args;

    return isExpanded;
  }

  get icon(): HdsAdvancedTableThSortExpandIcons {
    if (this.isExpanded === true) {
      return this.args.isExpandAll
        ? HdsAdvancedTableThExpandIconValues.UnfoldClose
        : HdsAdvancedTableThExpandIconValues.ChevronUp;
    } else {
      return this.args.isExpandAll
        ? HdsAdvancedTableThExpandIconValues.UnfoldOpen
        : HdsAdvancedTableThExpandIconValues.ChevronDown;
    }
  }

  @action onClick() {
    this.args.onToggle?.();
  }

  get classNames(): string {
    const classes = [
      'hds-advanced-table__th-button',
      'hds-advanced-table__th-button--expand',
    ];

    // add a class based on the isExpanded state
    if (this.args.isExpanded === true) {
      classes.push(`hds-advanced-table__th-button--is-expanded`);
    }

    return classes.join(' ');
  }

  <template>
    {{! template-lint-disable no-unsupported-role-attributes }}
    {{! ember template lint doesnt support ARIA 1.3 yet, including aria-description - https://github.com/A11yance/aria-query/pull/557 }}
    <button
      type="button"
      class={{this.classNames}}
      {{on "click" this.onClick}}
      aria-labelledby="{{this._prefixLabelId}} {{@labelId}}"
      aria-expanded="{{this.isExpanded}}"
      aria-description="Toggle the visibility of the related rows."
      ...attributes
    >
      {{! template-lint-enable no-unsupported-role-attributes}}
      <span
        id={{this._prefixLabelId}}
        class="hds-advanced-table__th-button-aria-label-hidden-segment"
      >Toggle</span>
      <HdsIcon @name={{this.icon}} />
    </button>
  </template>
}
