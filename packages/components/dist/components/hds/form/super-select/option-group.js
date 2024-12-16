import { a as _defineProperty } from '../../../../_rollupPluginBabelHelpers-DSLVWx63.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<li class=\"hds-form-super-select__option-group\" role=\"group\" aria-labelledby={{this._groupTitleId}}>\n  <Hds::Text::Body\n    @tag=\"div\"\n    @size=\"100\"\n    @weight=\"semibold\"\n    class=\"hds-form-super-select__option-group-title\"\n    id={{this._groupTitleId}}\n  >\n    {{@group.groupName}}\n  </Hds::Text::Body>\n  {{yield}}\n</li>");

class HdsFormSuperSelectOptionGroup extends Component {
  constructor(...args) {
    super(...args);
    /**
     * Generates a unique ID for the group title
     * @return {string}
     * @param _groupTitleId
     */
    _defineProperty(this, "_groupTitleId", 'group-title-' + guidFor(this));
  }
}
setComponentTemplate(TEMPLATE, HdsFormSuperSelectOptionGroup);

export { HdsFormSuperSelectOptionGroup as default };
//# sourceMappingURL=option-group.js.map
