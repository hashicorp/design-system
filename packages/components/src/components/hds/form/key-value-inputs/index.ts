/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { modifier } from 'ember-modifier';

import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../../utils/hds-aria-described-by.ts';
import { getElementId } from '../../../../utils/hds-get-element-id.ts';
import HdsAlertComponent from '../../alert/index.ts';
import HdsFormErrorComponent from '../error/index.ts';
import HdsFormHelperTextComponent from '../helper-text/index.ts';
import HdsFormKeyValueInputsDeleteRowButtonComponent from './delete-row-button.ts';
import HdsFormKeyValueInputsFieldComponent from './field.ts';
import HdsFormKeyValueInputsGenericComponent from './generic.ts';
import HdsFormLegendComponent from '../legend/index.ts';

import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';
import type { HdsFormFieldsetSignature } from '../fieldset/index.ts';
import type { HdsFormKeyValueInputsAddRowButtonSignature } from './add-row-button.ts';
import type { HdsYieldSignature } from '../../yield/index.ts';

const KEY_VALUE_PAIR_FIELD_SELECTOR = '.hds-form-key-value-inputs__field';
const KEY_VALUE_PAIR_GENERIC_SELECTOR =
  '.hds-form-key-value-inputs__generic-container';
const KEY_VALUE_PAIR_FIRST_ROW_SELECTOR =
  '.hds-form-key-value-inputs__row--first';
const KEY_VALUE_PAIR_DELETE_ROW_CONTAINER_SELECTOR =
  '.hds-form-key-value-inputs__row-delete-button-container';

export interface HdsFormKeyValueInputsSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    data: Array<unknown>;
  };
  Blocks: {
    header?: [
      {
        Legend?: WithBoundArgs<
          typeof HdsFormLegendComponent,
          'contextualClass' | 'id' | 'isOptional' | 'isRequired'
        >;
        HelperText?: WithBoundArgs<
          typeof HdsFormHelperTextComponent,
          'contextualClass' | 'controlId' | 'onInsert'
        >;
        Generic?: ComponentLike<HdsYieldSignature>;
      },
    ];
    row: [
      {
        Field?: WithBoundArgs<
          typeof HdsFormKeyValueInputsFieldComponent,
          'onInsert' | 'onRemove' | 'rowIndex'
        >;
        Generic?: WithBoundArgs<
          typeof HdsFormKeyValueInputsGenericComponent,
          'onInsert' | 'onRemove' | 'rowIndex'
        >;
        DeleteRowButton?: WithBoundArgs<
          typeof HdsFormKeyValueInputsDeleteRowButtonComponent,
          'rowData' | 'rowIndex'
        >;
        rowData?: unknown;
        rowIndex?: number;
      },
    ];
    footer?: [
      {
        AddRowButton?: ComponentLike<HdsFormKeyValueInputsAddRowButtonSignature>;
        Alert?: WithBoundArgs<typeof HdsAlertComponent, 'color' | 'type'>;
        Error?: WithBoundArgs<
          typeof HdsFormErrorComponent,
          'contextualClass' | 'controlId' | 'onInsert' | 'onRemove'
        >;
      },
    ];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedBy>' is not assignable to 'typeof HdsFormField'
@ariaDescribedBy
export default class HdsFormKeyValueInputs extends Component<HdsFormKeyValueInputsSignature> {
  private _element!: HTMLElement;
  @tracked _gridTemplateColumns = '';

  get id(): string {
    return getElementId(this);
  }

  get canDeleteRow(): boolean {
    return this.args.data.length > 1;
  }

  @action _setUpColumn(): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._updateColumns();
    });
  }

  @action _removeColumn(): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._updateColumns();
    });
  }

  @action
  appendDescriptor(element: HTMLElement): void {
    registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }

  @action removeDescriptor(element: HTMLElement): void {
    unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }

  private _setUpKeyValueInputs = modifier((element: HTMLElement) => {
    this._element = element;
  });

  // Update the column array based on how they are ordered in the DOM
  private _updateColumns = () => {
    const columns = this._element
      .querySelector(KEY_VALUE_PAIR_FIRST_ROW_SELECTOR)
      ?.querySelectorAll(
        `${KEY_VALUE_PAIR_FIELD_SELECTOR}, ${KEY_VALUE_PAIR_GENERIC_SELECTOR}, ${KEY_VALUE_PAIR_DELETE_ROW_CONTAINER_SELECTOR}`
      );

    let newGridTemplateColumns = '';

    columns?.forEach((column, index) => {
      const columnElement = column as HTMLDivElement;

      // do substring to remove the leading dot from the class selector
      if (
        column.classList.contains(KEY_VALUE_PAIR_FIELD_SELECTOR.substring(1))
      ) {
        if (columnElement.dataset['width']) {
          newGridTemplateColumns += `${columnElement.dataset['width']} `;
        } else {
          newGridTemplateColumns += '1fr ';
        }
      }
      // do substring to remove the leading dot from the class selector
      if (
        column.classList.contains(KEY_VALUE_PAIR_GENERIC_SELECTOR.substring(1))
      ) {
        newGridTemplateColumns += 'auto ';

        columnElement.style.setProperty(
          '--hds-key-value-pair-column-index',
          `${index + 1}`
        );
      }

      if (
        column.classList.contains(
          KEY_VALUE_PAIR_DELETE_ROW_CONTAINER_SELECTOR.substring(1)
        )
      ) {
        newGridTemplateColumns += 'min-content ';

        columnElement.style.setProperty(
          '--hds-key-value-pair-column-index',
          `${index + 1}`
        );
      }
    });

    this._gridTemplateColumns = newGridTemplateColumns;
  };
}
