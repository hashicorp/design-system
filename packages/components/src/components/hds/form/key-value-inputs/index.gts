/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import { modifier } from 'ember-modifier';

import { guidFor } from '@ember/object/internals';
import {
  ariaDescribedBy,
  registerAriaDescriptionElement,
  unregisterAriaDescriptionElement,
} from '../../../../utils/hds-aria-described-by.ts';

import HdsAlertComponent from '../../alert/index.gts';
import HdsFormErrorComponent from '../error/index.gts';
import HdsFormHelperTextComponent from '../helper-text/index.gts';
import HdsFormLegendComponent from '../legend/index.gts';
import HdsFormKeyValueInputsDeleteRowButtonComponent from './delete-row-button.gts';
import HdsFormKeyValueInputsFieldComponent from './field.gts';
import HdsFormKeyValueInputsGenericComponent from './generic.gts';

import type { AriaDescribedByComponent } from '../../../../utils/hds-aria-described-by.ts';
import type { HdsYieldSignature } from '../../yield/index.ts';
import type { HdsFormKeyValueInputsAddRowButtonSignature } from './add-row-button.gts';
import { hash } from '@ember/helper';
import style from 'ember-style-modifier';
import HdsFormLegend from '../legend/index.gts';
import { concat } from '@ember/helper';
import HdsFormHelperText from '../helper-text/index.gts';
import HdsYield from '../../yield/index.gts';
import { eq } from 'ember-truth-helpers';
import HdsFormKeyValueInputsField from './field.gts';
import HdsFormKeyValueInputsDeleteRowButton from './delete-row-button.gts';
import HdsFormKeyValueInputsGeneric from './generic.gts';
import HdsAlert from '../../alert/index.gts';
import HdsFormKeyValueInputsAddRowButton from './add-row-button.gts';
import HdsFormError from '../error/index.gts';

const KEY_VALUE_INPUTS_FIELD_SELECTOR = '.hds-form-key-value-inputs__field';
const KEY_VALUE_INPUTS_GENERIC_SELECTOR =
  '.hds-form-key-value-inputs__generic-container';
const KEY_VALUE_INPUTS_FIRST_ROW_SELECTOR =
  '.hds-form-key-value-inputs__row--first';
const KEY_VALUE_INPUTS_DELETE_ROW_CONTAINER_SELECTOR =
  '.hds-form-key-value-inputs__delete-row-button-container';

export interface HdsFormKeyValueInputsSignature {
  Args: {
    data: Array<unknown>;
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
  Element: HTMLFieldSetElement;
}

// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedBy>' is not assignable to 'typeof HdsFormField'
@ariaDescribedBy
export default class HdsFormKeyValueInputs extends Component<HdsFormKeyValueInputsSignature> {
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

  <template>
    <fieldset
      class="hds-form-key-value-inputs"
      ...attributes
      {{style --hds-key-value-inputs-columns=this._gridTemplateColumns}}
      {{! need to set aria-labelledby because the legend is not a direct descendant of the fieldset }}
      aria-labelledby="legend-{{this.glueId}}"
      {{! @glint-expect-error }}
      aria-describedby={{this.ariaDescribedBy}}
      tabindex="-1"
      {{this._setUpKeyValueInputs}}
    >
      <div class="hds-form-key-value-inputs__header">
        {{yield
          (hash
            Legend=(component
              HdsFormLegend
              contextualClass="hds-form-key-value-inputs__legend"
              id=(concat "legend-" this.glueId)
              isOptional=@isOptional
              isRequired=@isRequired
            )
            HelperText=(component
              HdsFormHelperText
              contextualClass="hds-form-key-value-inputs__helper-text"
              controlId=this.glueId
              onInsert=this.appendDescriptor
            )
            Generic=HdsYield
          )
          to="header"
        }}
      </div>

      {{#if (eq @data.length 0)}}
        <div
          class="hds-form-key-value-inputs__row hds-form-key-value-inputs__row--first"
        >
          {{yield
            (hash
              Field=(component
                HdsFormKeyValueInputsField
                onInsert=this._setUpColumn
                onRemove=this._removeColumn
                rowIndex=0
              )
              Generic=(component
                HdsFormKeyValueInputsGeneric
                onInsert=this._setUpColumn
                onRemove=this._removeColumn
              )
              rowData=undefined
              rowIndex=0
            )
            to="row"
          }}

          {{! leaving as a separate yield to keep the delete row button at the end of the row }}
          {{yield
            (hash
              DeleteRowButton=(component
                HdsFormKeyValueInputsDeleteRowButton
                returnFocusTo=this._element
                onInsert=this._setUpColumn
                onRemove=this._removeColumn
                rowData=undefined
                rowIndex=0
              )
            )
            to="row"
          }}
        </div>
      {{/if}}

      {{#each @data as |item index|}}
        <div
          class="hds-form-key-value-inputs__row
            {{if (eq index 0) 'hds-form-key-value-inputs__row--first'}}"
        >
          {{yield
            (hash
              Field=(component
                HdsFormKeyValueInputsField
                onInsert=this._setUpColumn
                onRemove=this._removeColumn
                rowIndex=index
              )
              Generic=(component
                HdsFormKeyValueInputsGeneric
                onInsert=this._setUpColumn
                onRemove=this._removeColumn
              )
              rowData=item
              rowIndex=index
            )
            to="row"
          }}

          {{! leaving as a separate yield to keep the delete row button at the end of the row }}
          {{yield
            (hash
              DeleteRowButton=(component
                HdsFormKeyValueInputsDeleteRowButton
                onInsert=this._setUpColumn
                onRemove=this._removeColumn
                returnFocusTo=this._element
                rowData=item
                rowIndex=index
              )
              rowData=item
              rowIndex=index
            )
            to="row"
          }}
        </div>
      {{/each}}

      <div class="hds-form-key-value-inputs__footer">
        {{yield
          (hash
            Alert=(component HdsAlert color="neutral" type="compact")
            AddRowButton=(component HdsFormKeyValueInputsAddRowButton)
            Error=(component
              HdsFormError
              contextualClass="hds-form-key-value-inputs__error"
              controlId=this.glueId
              onInsert=this.appendDescriptor
              onRemove=this.removeDescriptor
            )
          )
          to="footer"
        }}
      </div>
    </fieldset>
  </template>
}
