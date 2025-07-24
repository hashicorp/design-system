import Component from '@glimmer/component';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { registerAriaDescriptionElement, unregisterAriaDescriptionElement, ariaDescribedBy } from '../../../../utils/hds-aria-described-by.js';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import '../error/index.js';
import '../file-input/base.js';
import '../helper-text/index.js';
import { ID_PREFIX } from '../label/index.js';
import '../masked-input/base.js';
import '../select/base.js';
import '../super-select/multiple/base.js';
import '../super-select/single/base.js';
import '../textarea/base.js';
import '../text-input/base.js';
import { precompileTemplate } from '@ember/template-compilation';
import { c, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-form-key-value-inputs__field\" data-width={{@width}} ...attributes {{this._onInsert}}>\n  <div class=\"hds-form-key-value-inputs__field-header\">\n    {{yield\n      (hash\n        Label=(component\n          \"hds/form/label\"\n          contextualClass=\"hds-form-key-value-inputs__field-label\"\n          controlId=this.id\n          hiddenText=this.labelHiddenText\n          isOptional=@isOptional\n          isRequired=@isRequired\n        )\n      )\n    }}\n    {{yield\n      (hash\n        HelperText=(component\n          \"hds/form/helper-text\"\n          contextualClass=\"hds-form-key-value-inputs__field-helper-text\"\n          controlId=this.id\n          onInsert=this.appendDescriptor\n        )\n      )\n    }}\n  </div>\n  <div class=\"hds-form-key-value-inputs__field-control\">\n\n    {{! @glint-expect-error - Glint does not recognize `this.ariaDescribedBy` as defined when used directly in a multi-line hash passed to yield. Since `@glint-expect-error` only applies to the line immediately after it and cannot be placed inside a multi-line hash, we use a `let` to work around this limitation. }}\n    {{#let this.ariaDescribedBy as |ariaDescribedBy|}}\n      {{yield\n        (hash\n          FileInput=(component \"hds/form/file-input/base\" ariaDescribedBy=ariaDescribedBy id=this.id)\n          MaskedInput=(component\n            \"hds/form/masked-input/base\" ariaDescribedBy=ariaDescribedBy id=this.id isInvalid=@isInvalid\n          )\n          Select=(component \"hds/form/select/base\" ariaDescribedBy=ariaDescribedBy id=this.id isInvalid=@isInvalid)\n          SuperSelectSingle=(component\n            \"hds/form/super-select/single/base\"\n            ariaDescribedBy=ariaDescribedBy\n            ariaLabelledBy=(concat this.labelIdPrefix this.id)\n            isInvalid=@isInvalid\n            triggerId=this.id\n          )\n          SuperSelectMultiple=(component\n            \"hds/form/super-select/multiple/base\"\n            ariaDescribedBy=ariaDescribedBy\n            ariaLabelledBy=(concat this.labelIdPrefix this.id)\n            isInvalid=@isInvalid\n            triggerId=this.id\n          )\n          TextInput=(component\n            \"hds/form/text-input/base\" ariaDescribedBy=ariaDescribedBy id=this.id isInvalid=@isInvalid\n          )\n          Textarea=(component \"hds/form/textarea/base\" ariaDescribedBy=ariaDescribedBy id=this.id isInvalid=@isInvalid)\n        )\n      }}\n    {{/let}}\n\n    {{yield\n      (hash\n        Error=(component\n          \"hds/form/error\"\n          contextualClass=\"hds-form-key-value-inputs__field-error\"\n          controlId=this.id\n          onInsert=this.appendDescriptor\n          onRemove=this.removeDescriptor\n        )\n      )\n    }}\n  </div>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsFormKeyValueInputsField = c(class HdsFormKeyValueInputsField extends Component {
  _onInsert = modifier(() => {
    if (this.args.onInsert) {
      this.args.onInsert();
    }
    return () => {
      if (this.args.onRemove) {
        this.args.onRemove();
      }
    };
  });
  get id() {
    return getElementId(this);
  }
  get labelHiddenText() {
    return `row ${this.args.rowIndex + 1}`;
  }
  get labelIdPrefix() {
    return ID_PREFIX;
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
}, [ariaDescribedBy]);
setComponentTemplate(TEMPLATE, HdsFormKeyValueInputsField);

export { HdsFormKeyValueInputsField as default };
//# sourceMappingURL=field.js.map
