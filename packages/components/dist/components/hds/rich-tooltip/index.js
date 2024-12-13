import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-81503waH.js';
import Component from '@glimmer/component';
import { getElementId } from '../../../utils/hds-get-element-id.js';
import './toggle.js';
import './bubble.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, InPP.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember becomes visible in the underlined text (being an inline element) - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n<Hds::PopoverPrimitive\n  @isOpen={{@isOpen}}\n  @onOpen={{@onOpen}}\n  @onClose={{@onClose}}\n  @enableSoftEvents={{this.enableSoftEvents}}\n  @enableClickEvents={{this.enableClickEvents}}\n  as |PP|\n><div class=\"hds-rich-tooltip\" ...attributes {{PP.setupPrimitiveContainer}}>\n    {{~yield\n      (hash\n        Toggle=(component\n          \"hds/rich-tooltip/toggle\"\n          popoverId=this._popoverId\n          setupPrimitiveToggle=PP.setupPrimitiveToggle\n          isOpen=PP.isOpen\n        )\n        Bubble=(component\n          \"hds/rich-tooltip/bubble\"\n          arrowId=this._arrowId\n          popoverId=this._popoverId\n          setupPrimitivePopover=PP.setupPrimitivePopover\n          isOpen=PP.isOpen\n        )\n        isOpen=PP.isOpen\n        close=PP.hidePopover\n      )\n    ~}}\n  </div></Hds::PopoverPrimitive>");

class HdsRichTooltip extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "_elementId", getElementId(this));
    _defineProperty(this, "_arrowId", `arrow-${this._elementId}`);
    _defineProperty(this, "_popoverId", `popover-${this._elementId}`);
  }
  get enableSoftEvents() {
    return this.args.enableClickEvents !== true;
  }
  get enableClickEvents() {
    return this.args.enableClickEvents ?? false;
  }
}
setComponentTemplate(TEMPLATE, HdsRichTooltip);

export { HdsRichTooltip as default };
//# sourceMappingURL=index.js.map
