/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';

import HdsFormSelectBase from '../../form/select/base.gts';

import type { HdsFormSelectBaseSignature } from '../../form/select/base.gts';

export interface HdsPaginationSizeSelectorSignature {
  Args: {
    pageSizes: number[];
    label?: string;
    selectedSize?: number;
    onChange?: (size: number) => void;
  };
  Element: HTMLDivElement;
}

export default class HdsPaginationSizeSelector extends Component<HdsPaginationSizeSelectorSignature> {
  private _sizeSelectorId = 'pagination-size-selector-' + guidFor(this);

  get pageSizes(): number[] {
    const { pageSizes } = this.args;

    assert(
      '@pageSizes for "Pagination::SizeSelector" must be defined',
      pageSizes !== undefined
    );

    return pageSizes;
  }

  get selectedSize(): number | undefined {
    const { selectedSize } = this.args;

    assert(
      `@selectedSize for "Pagination::SizeSelector" must one of the @pageSizes provided (${this.pageSizes.join(
        ','
      )}), received ${selectedSize}`,
      selectedSize === undefined || this.pageSizes.includes(selectedSize)
    );

    return selectedSize;
  }

  get label(): string {
    const { label = 'Items per page' } = this.args;

    return label;
  }

  onChange = (e: Event): void => {
    const { onChange } = this.args;

    const target = e.target as HdsFormSelectBaseSignature['Element'];

    if (typeof onChange === 'function') {
      onChange(parseInt(target.value));
    }
  };

  <template>
    <div class="hds-pagination-size-selector" ...attributes>
      <label
        class="hds-typography-body-100 hds-font-weight-medium"
        for={{this._sizeSelectorId}}
      >
        {{this.label}}
      </label>
      <HdsFormSelectBase
        id={{this._sizeSelectorId}}
        {{on "change" this.onChange}}
        as |S|
      >
        <S.Options>
          {{#each this.pageSizes as |size|}}
            <option
              value={{size}}
              selected={{if (eq size this.selectedSize) true null}}
            >{{size}}</option>
          {{/each}}
        </S.Options>
      </HdsFormSelectBase>
    </div>
  </template>
}
