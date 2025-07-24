import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import { HdsCodeBlockTitleTagValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Text::Body\n  id={{this._id}}\n  @size=\"200\"\n  @tag={{this.componentTag}}\n  @weight=\"semibold\"\n  class=\"hds-code-block__title\"\n  ...attributes\n  {{this._setUpTitle @didInsertNode}}\n>\n  {{yield}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
class HdsCodeBlockTitle extends Component {
  _id = 'title-' + guidFor(this);
  _setUpTitle = modifier((element, [insertCallbackFunction]) => {
    if (typeof insertCallbackFunction === 'function') {
      insertCallbackFunction(element);
    }
  });
  get componentTag() {
    return this.args.tag ?? HdsCodeBlockTitleTagValues.P;
  }
}
setComponentTemplate(TEMPLATE, HdsCodeBlockTitle);

export { HdsCodeBlockTitle as default };
//# sourceMappingURL=title.js.map
