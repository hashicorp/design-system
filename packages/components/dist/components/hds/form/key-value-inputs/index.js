import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { modifier } from 'ember-modifier';
import { registerAriaDescriptionElement, unregisterAriaDescriptionElement, ariaDescribedBy } from '../../../../utils/hds-aria-described-by.js';
import { guidFor } from '@ember/object/internals';
import '../../alert/index.js';
import '../error/index.js';
import '../helper-text/index.js';
import './delete-row-button.js';
import './field.js';
import './generic.js';
import '../legend/index.js';
import { precompileTemplate } from '@ember/template-compilation';
import { c, g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<fieldset\n  class=\"hds-form-key-value-inputs\"\n  ...attributes\n  {{style --hds-key-value-inputs-columns=this._gridTemplateColumns}}\n  {{! need to set aria-labelledby because the legend is not a direct descendant of the fieldset }}\n  aria-labelledby=\"legend-{{this.glueId}}\"\n  {{! @glint-expect-error }}\n  aria-describedby={{this.ariaDescribedBy}}\n  tabindex=\"-1\"\n  {{this._setUpKeyValueInputs}}\n>\n  <div class=\"hds-form-key-value-inputs__header\">\n    {{yield\n      (hash\n        Legend=(component\n          \"hds/form/legend\"\n          contextualClass=\"hds-form-key-value-inputs__legend\"\n          id=(concat \"legend-\" this.glueId)\n          isOptional=@isOptional\n          isRequired=@isRequired\n        )\n        HelperText=(component\n          \"hds/form/helper-text\"\n          contextualClass=\"hds-form-key-value-inputs__helper-text\"\n          controlId=this.glueId\n          onInsert=this.appendDescriptor\n        )\n        Generic=(component \"hds/yield\")\n      )\n      to=\"header\"\n    }}\n  </div>\n\n  {{#if (eq @data.length 0)}}\n    <div class=\"hds-form-key-value-inputs__row hds-form-key-value-inputs__row--first\">\n      {{yield\n        (hash\n          Field=(component\n            \"hds/form/key-value-inputs/field\" onInsert=this._setUpColumn onRemove=this._removeColumn rowIndex=0\n          )\n          Generic=(component \"hds/form/key-value-inputs/generic\" onInsert=this._setUpColumn onRemove=this._removeColumn)\n          rowData=undefined\n          rowIndex=0\n        )\n        to=\"row\"\n      }}\n\n      {{! leaving as a separate yield to keep the delete row button at the end of the row }}\n      {{yield\n        (hash\n          DeleteRowButton=(component\n            \"hds/form/key-value-inputs/delete-row-button\"\n            returnFocusTo=this._element\n            onInsert=this._setUpColumn\n            onRemove=this._removeColumn\n            rowData=undefined\n            rowIndex=0\n          )\n        )\n        to=\"row\"\n      }}\n    </div>\n  {{/if}}\n\n  {{#each @data as |item index|}}\n    <div class=\"hds-form-key-value-inputs__row {{if (eq index 0) \'hds-form-key-value-inputs__row--first\'}}\">\n      {{yield\n        (hash\n          Field=(component\n            \"hds/form/key-value-inputs/field\" onInsert=this._setUpColumn onRemove=this._removeColumn rowIndex=index\n          )\n          Generic=(component \"hds/form/key-value-inputs/generic\" onInsert=this._setUpColumn onRemove=this._removeColumn)\n          rowData=item\n          rowIndex=index\n        )\n        to=\"row\"\n      }}\n\n      {{! leaving as a separate yield to keep the delete row button at the end of the row }}\n      {{yield\n        (hash\n          DeleteRowButton=(component\n            \"hds/form/key-value-inputs/delete-row-button\"\n            onInsert=this._setUpColumn\n            onRemove=this._removeColumn\n            returnFocusTo=this._element\n            rowData=item\n            rowIndex=index\n          )\n          rowData=item\n          rowIndex=index\n        )\n        to=\"row\"\n      }}\n    </div>\n  {{/each}}\n\n  <div class=\"hds-form-key-value-inputs__footer\">\n    {{yield\n      (hash\n        Alert=(component \"hds/alert\" color=\"neutral\" type=\"compact\")\n        AddRowButton=(component \"hds/form/key-value-inputs/add-row-button\")\n        Error=(component\n          \"hds/form/error\"\n          contextualClass=\"hds-form-key-value-inputs__error\"\n          controlId=this.glueId\n          onInsert=this.appendDescriptor\n          onRemove=this.removeDescriptor\n        )\n      )\n      to=\"footer\"\n    }}\n  </div>\n</fieldset>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const KEY_VALUE_INPUTS_FIELD_SELECTOR = '.hds-form-key-value-inputs__field';
const KEY_VALUE_INPUTS_GENERIC_SELECTOR = '.hds-form-key-value-inputs__generic-container';
const KEY_VALUE_INPUTS_FIRST_ROW_SELECTOR = '.hds-form-key-value-inputs__row--first';
const KEY_VALUE_INPUTS_DELETE_ROW_CONTAINER_SELECTOR = '.hds-form-key-value-inputs__delete-row-button-container';
const HdsFormKeyValueInputs = c(class HdsFormKeyValueInputs extends Component {
  _element;
  static {
    g(this.prototype, "_gridTemplateColumns", [tracked], function () {
      return '';
    });
  }
  #_gridTemplateColumns = (i(this, "_gridTemplateColumns"), void 0);
  // this is not a specific DOM id, but a value that is used to "glue" together
  // different fieldsset-related elements (legend, helper text, error) with the fieldset itself
  get glueId() {
    return guidFor(this);
  }
  _setUpColumn() {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this._updateColumns();
    });
  }
  static {
    n(this.prototype, "_setUpColumn", [action]);
  }
  _removeColumn() {
    // eslint-disable-next-line ember/no-runloop
    schedule('afterRender', () => {
      this._updateColumns();
    });
  }
  static {
    n(this.prototype, "_removeColumn", [action]);
  }
  appendDescriptor(element) {
    registerAriaDescriptionElement(this, element);
  }
  static {
    n(this.prototype, "appendDescriptor", [action]);
  }
  removeDescriptor(element) {
    unregisterAriaDescriptionElement(this, element);
  }
  static {
    n(this.prototype, "removeDescriptor", [action]);
  }
  _setUpKeyValueInputs = modifier(element => {
    this._element = element;
  });

  // Update the column array based on how they are ordered in the DOM
  _updateColumns = () => {
    const columns = this._element.querySelector(KEY_VALUE_INPUTS_FIRST_ROW_SELECTOR)?.querySelectorAll(`${KEY_VALUE_INPUTS_FIELD_SELECTOR}, ${KEY_VALUE_INPUTS_GENERIC_SELECTOR}, ${KEY_VALUE_INPUTS_DELETE_ROW_CONTAINER_SELECTOR}`);
    let updatedGridTemplateColumns = '';
    columns?.forEach((column, index) => {
      const columnElement = column;

      // FIELD

      if (
      // do substring to remove the leading dot from the class selector
      column.classList.contains(KEY_VALUE_INPUTS_FIELD_SELECTOR.substring(1))) {
        if (columnElement.dataset['width']) {
          updatedGridTemplateColumns += `${columnElement.dataset['width']} `;
        } else {
          updatedGridTemplateColumns += '1fr ';
        }
      }

      // GENERIC

      if (
      // do substring to remove the leading dot from the class selector
      column.classList.contains(KEY_VALUE_INPUTS_GENERIC_SELECTOR.substring(1))) {
        updatedGridTemplateColumns += 'auto ';

        // Set grid-column so generic content appears in the correct column when grid-row is set; otherwise, browsers default it to the first column.
        columnElement.style.setProperty('--hds-key-value-inputs-column-index', `${index + 1}`);
      }

      // DELETE BUTTON

      if (column.classList.contains(KEY_VALUE_INPUTS_DELETE_ROW_CONTAINER_SELECTOR.substring(1))) {
        // Set grid-column so generic content appears in the correct column when grid-row is set; otherwise, browsers default it to the first column.
        columnElement.style.setProperty('--hds-key-value-inputs-column-index', `${index + 1}`);
      }
    });

    // we always set aside the space for the delete button (it's always the last element)
    // even when it's not rendered, to avoid layout shifts when moving to/from an empty state
    updatedGridTemplateColumns += '2.25rem ';
    this._gridTemplateColumns = updatedGridTemplateColumns;
  };
}, [ariaDescribedBy]);
setComponentTemplate(TEMPLATE, HdsFormKeyValueInputs);

export { HdsFormKeyValueInputs as default };
//# sourceMappingURL=index.js.map
