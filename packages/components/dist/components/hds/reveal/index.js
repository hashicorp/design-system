import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-C_TsMG3M.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::DisclosurePrimitive class=\"hds-reveal\" @isOpen={{@isOpen}} ...attributes>\n  <:toggle as |t|>\n    <Hds::Reveal::Toggle::Button\n      aria-controls={{t.contentId}}\n      @text={{this.getText t.isOpen}}\n      @isOpen={{t.isOpen}}\n      {{on \"click\" t.onClickToggle}}\n    />\n  </:toggle>\n\n  <:content>\n    <div class=\"hds-reveal__content hds-typography-body-200 hds-foreground-primary\">\n      {{yield}}\n    </div>\n  </:content>\n</Hds::DisclosurePrimitive>");

class HdsReveal extends Component {
  constructor(...args) {
    super(...args);
    /**
     * @param getText
     * @type {string}
     * @description A local function that emulates a getter to compute the value of the `@text` argument for the button (mainly to make TypeScript happy)
     */
    _defineProperty(this, "getText", isOpen => {
      if (isOpen && this.args.textWhenOpen !== undefined) {
        return this.args.textWhenOpen;
      } else {
        if (this.args.text !== undefined) {
          return this.args.text;
        } else {
          assert('@text for "Hds::Reveal" must have a valid value');
        }
      }
    });
  }
}
setComponentTemplate(TEMPLATE, HdsReveal);

export { HdsReveal as default };
//# sourceMappingURL=index.js.map
