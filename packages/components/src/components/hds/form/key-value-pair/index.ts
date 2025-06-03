/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

import type { HdsFormFieldsetSignature } from '../fieldset/index.ts';
import type { HdsFormLegendSignature } from '../legend/index.ts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.ts';
import type { HdsFormErrorSignature } from '../error/index.ts';
import type { HdsYieldSignature } from '../../yield/index.ts';
import type { HdsFormKeyValuePairFieldSignature } from './field.ts';
import type { HdsFormKeyValuePairDeleteRowButtonSignature } from './delete-row-button.ts';
import type { HdsFormKeyValuePairAddRowButtonSignature } from './add-row-button.ts';
import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../../utils/hds-aria-described-by.ts';
import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';
import type {HdsFormKeyValuePairYieldSignature} from './yield.ts';

export interface HdsFormKeyValuePairSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    data: Array<unknown>;
  };
  Blocks: {
    header?: [
      {
        Legend?: ComponentLike<HdsFormLegendSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Generic?: ComponentLike<HdsYieldSignature>;
      },
    ];
    row: [
      {
        Field?: ComponentLike<HdsFormKeyValuePairFieldSignature>;
        DeleteRowButton?: ComponentLike<HdsFormKeyValuePairDeleteRowButtonSignature>;
        Generic?: ComponentLike<HdsFormKeyValuePairYieldSignature>;
        rowData?: unknown;
      },
    ];
    footer?: [
      {
        Generic?: ComponentLike<HdsYieldSignature>;
        AddRowButton?: ComponentLike<HdsFormKeyValuePairAddRowButtonSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedBy>' is not assignable to 'typeof HdsFormField'
@ariaDescribedBy
export default class HdsFormKeyValuePair extends Component<HdsFormKeyValuePairSignature> {
  private _id = guidFor(this);
  @tracked  _columns: HTMLDivElement[] = [];
  @tracked data: Array<unknown> = this.args.data ?? [];

  get canDeleteRow(): boolean {
    return this.data.length > 1;
  }

  @action _setUpColumn(element: HTMLDivElement): void {
    this._columns.push(element);
  }

    @action _removeColumn(element: HTMLDivElement): void {
      this._columns = this._columns.filter((col) => col !== element);
  }

  @action
  appendDescriptor(element: HTMLElement): void {
    registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }

  @action removeDescriptor(element: HTMLElement): void {
    unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }
}
