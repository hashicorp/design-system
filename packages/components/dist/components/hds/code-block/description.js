import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Text::Body\n  id={{this._id}}\n  @tag=\"p\"\n  @size=\"100\"\n  class=\"hds-code-block__description\"\n  ...attributes\n  {{this._setUpDescription @didInsertNode}}\n>\n  {{yield}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsCodeBlockDescription extends Component {
  _id = 'description-' + guidFor(this);
  _setUpDescription = modifier((element, [insertCallbackFunction]) => {
    if (typeof insertCallbackFunction === 'function') {
      insertCallbackFunction(element);
    }
  });
}
setComponentTemplate(TEMPLATE, HdsCodeBlockDescription);

export { HdsCodeBlockDescription as default };
//# sourceMappingURL=description.js.map
