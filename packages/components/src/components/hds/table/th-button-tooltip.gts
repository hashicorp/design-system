/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';

import HdsIcon from '../icon/index.gts';
import hdsTooltip from '../../../modifiers/hds-tooltip.ts';
import hdsT from '../../../helpers/hds-t.ts';

export interface HdsTableThButtonTooltipSignature {
  Args: {
    labelId?: string;
    tooltip: string;
  };
  Element: HTMLButtonElement;
}

export default class HdsTableThButtonTooltip extends Component<HdsTableThButtonTooltipSignature> {
  // Generates a unique ID for the (hidden) "label prefix" <span> element
  private _prefixLabelId = guidFor(this);

  get tooltip(): string {
    assert(
      `@tooltip for "HdsTableThButtonTooltip" must be a string`,
      typeof this.args.tooltip === 'string'
    );
    return this.args.tooltip;
  }

  get classNames(): string {
    const classes = ['hds-table__th-button', 'hds-table__th-button--tooltip'];

    return classes.join(' ');
  }

  <template>
    <button
      type="button"
      class={{this.classNames}}
      {{hdsTooltip this.tooltip}}
      aria-labelledby="{{this._prefixLabelId}} {{@labelId}}"
      ...attributes
    >
      <span
        id={{this._prefixLabelId}}
        class="hds-table__th-button-aria-label-hidden-segment"
      >
        {{hdsT
          "hds.components.common.tooltip-prefix"
          default="More information for"
        }}
      </span>
      <HdsIcon @name="info" />
    </button>
  </template>
}
