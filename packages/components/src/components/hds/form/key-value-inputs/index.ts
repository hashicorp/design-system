/**
 * Copyright IBM Corp. 2021, 2025
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
import { guidFor } from '@ember/object/internals';

import HdsAlertComponent from '../../alert/index.gts';
import HdsFormErrorComponent from '../error/index.gts';
import HdsFormHelperTextComponent from '../helper-text/index.gts';
import HdsFormKeyValueInputsDeleteRowButtonComponent from './delete-row-button.ts';
import HdsFormKeyValueInputsFieldComponent from './field.ts';
import HdsFormKeyValueInputsGenericComponent from './generic.ts';
import HdsFormLegendComponent from '../legend/index.gts';

import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';
import type { HdsFormKeyValueInputsAddRowButtonSignature } from './add-row-button.ts';
import type { HdsYieldSignature } from '../../yield/index.gts';

const KEY_VALUE_INPUTS_FIELD_SELECTOR = '.hds-form-key-value-inputs__field';
const KEY_VALUE_INPUTS_GENERIC_SELECTOR =
  '.hds-form-key-value-inputs__generic-container';
const KEY_VALUE_INPUTS_FIRST_ROW_SELECTOR =
  '.hds-form-key-value-inputs__row--first';
const KEY_VALUE_INPUTS_DELETE_ROW_CONTAINER_SELECTOR =
  '.hds-form-key-value-inputs__delete-row-button-container';

export interface HdsFormKeyValueInputsSignature<T = unknown> {
  Args: {
    data: Array<T>;
    extraAriaDescribedBy?: string;
    isOptional?: boolean;
    isRequired?: boolean;
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
          'onInsert' | 'onRemove'
        >;
        DeleteRowButton?: WithBoundArgs<
          typeof HdsFormKeyValueInputsDeleteRowButtonComponent,
          'onInsert' | 'onRemove' | 'returnFocusTo' | 'rowData' | 'rowIndex'
        >;
        rowData?: T;
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
  Element: HTMLFieldSetElement;
}

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedBy>' is not assignable to 'typeof HdsFormField'
@ariaDescribedBy
export default class HdsFormKeyValueInputs<T = unknown> extends Component<
  HdsFormKeyValueInputsSignature<T>
> {
  private _element!: HTMLFieldSetElement;
  @tracked _gridTemplateColumns = '';

  // this is not a specific DOM id, but a value that is used to "glue" together
  // different fieldsset-related elements (legend, helper text, error) with the fieldset itself
  get glueId(): string {
    return guidFor(this);
  }

  @action
  _setUpColumn(): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._updateColumns();
    });
  }

  @action
  _removeColumn(): void {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', (): void => {
      this._updateColumns();
    });
  }

  @action
  appendDescriptor(element: HTMLElement): void {
    registerAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }

  @action
  removeDescriptor(element: HTMLElement): void {
    unregisterAriaDescriptionElement(this as AriaDescribedByComponent, element);
  }

  private _setUpKeyValueInputs = modifier((element: HTMLFieldSetElement) => {
    this._element = element;
  });

  // Update the column array based on how they are ordered in the DOM
  private _updateColumns = () => {
    const columns = this._element
      .querySelector(KEY_VALUE_INPUTS_FIRST_ROW_SELECTOR)
      ?.querySelectorAll(
        `${KEY_VALUE_INPUTS_FIELD_SELECTOR}, ${KEY_VALUE_INPUTS_GENERIC_SELECTOR}, ${KEY_VALUE_INPUTS_DELETE_ROW_CONTAINER_SELECTOR}`
      );

    let updatedGridTemplateColumns = '';

    columns?.forEach((column, index) => {
      const columnElement = column as HTMLElement;

      // FIELD

      if (
        // do substring to remove the leading dot from the class selector
        column.classList.contains(KEY_VALUE_INPUTS_FIELD_SELECTOR.substring(1))
      ) {
        if (columnElement.dataset['width']) {
          updatedGridTemplateColumns += `${columnElement.dataset['width']} `;
        } else {
          updatedGridTemplateColumns += '1fr ';
        }
      }

      // GENERIC

      if (
        // do substring to remove the leading dot from the class selector
        column.classList.contains(
          KEY_VALUE_INPUTS_GENERIC_SELECTOR.substring(1)
        )
      ) {
        updatedGridTemplateColumns += 'auto ';

        // Set grid-column so generic content appears in the correct column when grid-row is set; otherwise, browsers default it to the first column.
        columnElement.style.setProperty(
          '--hds-key-value-inputs-column-index',
          `${index + 1}`
        );
      }

      // DELETE BUTTON

      if (
        column.classList.contains(
          KEY_VALUE_INPUTS_DELETE_ROW_CONTAINER_SELECTOR.substring(1)
        )
      ) {
        // Set grid-column so generic content appears in the correct column when grid-row is set; otherwise, browsers default it to the first column.
        columnElement.style.setProperty(
          '--hds-key-value-inputs-column-index',
          `${index + 1}`
        );
      }
    });

    // we always set aside the space for the delete button (it's always the last element)
    // even when it's not rendered, to avoid layout shifts when moving to/from an empty state
    updatedGridTemplateColumns += '2.25rem ';

    this._gridTemplateColumns = updatedGridTemplateColumns;
  };
}
