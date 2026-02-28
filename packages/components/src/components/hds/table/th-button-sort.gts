/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';

import {
  HdsTableThSortOrderIconValues,
  HdsTableThSortOrderValues,
} from './types.ts';
import HdsIcon from '../icon/index.gts';
import hdsT from '../../../helpers/hds-t.ts';

import type {
  HdsTableThSortOrder,
  HdsTableThSortOrderIcons,
  HdsTableThSortOrderLabels,
} from './types.ts';
import type HdsIntlService from '../../../services/hds-intl.ts';

export interface HdsTableThButtonSortSignature {
  Args: {
    labelId?: string;
    onClick?: () => void;
    sortOrder?: HdsTableThSortOrder;
  };
  Element: HTMLButtonElement;
}

const NOOP = () => {};

export default class HdsTableThButtonSort extends Component<HdsTableThButtonSortSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  // Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
  private _prefixLabelId = 'prefix-' + guidFor(this);
  private _suffixLabelId = 'suffix-' + guidFor(this);

  get icon(): HdsTableThSortOrderIcons {
    switch (this.args.sortOrder) {
      case HdsTableThSortOrderValues.Asc:
        return HdsTableThSortOrderIconValues.ArrowUp;
      case HdsTableThSortOrderValues.Desc:
        return HdsTableThSortOrderIconValues.ArrowDown;
      default:
        return HdsTableThSortOrderIconValues.SwapVertical;
    }
  }

  // Determines the label (suffix) to use in the `aria-labelledby` attribute of the button,
  // used to indicate what will happen if the user clicks on the button
  get sortOrderLabel(): HdsTableThSortOrderLabels {
    const { sortOrder } = this.args;

    const translatedLabel =
      sortOrder === HdsTableThSortOrderValues.Asc
        ? this.hdsIntl.t('hds.components.common.descending', {
            default: 'descending',
          })
        : this.hdsIntl.t('hds.components.common.ascending', {
            default: 'ascending',
          });

    return translatedLabel as HdsTableThSortOrderLabels;
  }

  get onClick(): () => void {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }

  get classNames(): string {
    const classes = ['hds-table__th-button', 'hds-table__th-button--sort'];

    // add a class based on the @sortOrder argument
    if (
      this.args.sortOrder === HdsTableThSortOrderValues.Asc ||
      this.args.sortOrder === HdsTableThSortOrderValues.Desc
    ) {
      classes.push(`hds-table__th-button--is-sorted`);
    }

    return classes.join(' ');
  }

  <template>
    <button
      type="button"
      class={{this.classNames}}
      {{on "click" this.onClick}}
      aria-labelledby="{{this._prefixLabelId}} {{@labelId}} {{this._suffixLabelId}}"
      ...attributes
    >
      <span
        id={{this._prefixLabelId}}
        class="hds-table__th-button-aria-label-hidden-segment"
      >
        {{hdsT "hds.components.common.sort-by" default="Sort by"}}
      </span>
      <span
        id={{this._suffixLabelId}}
        class="hds-table__th-button-aria-label-hidden-segment"
      >
        {{this.sortOrderLabel}}
      </span>
      <HdsIcon @name={{this.icon}} />
    </button>
  </template>
}
