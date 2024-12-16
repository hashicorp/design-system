import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-DSLVWx63.js';
import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember causes extra space around the time element - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n<span class=\"hds-time hds-time--range\" ...attributes>\n  <time datetime={{this.startDateIsoUtcString}}>\n    {{~hds-format-date @startDate this.startDateDisplayFormat~}}\n  </time>\n  –\n  <time datetime={{this.endDateIsoUtcString}}>\n    {{~hds-format-date @endDate this.endDateDisplayFormat~}}\n  </time>\n</span>");

var _class, _descriptor;
let HdsTimeRange = (_class = class HdsTimeRange extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "hdsTime", _descriptor, this);
  }
  get startDateIsoUtcString() {
    const {
      startDate
    } = this.args;
    if (startDate) {
      return this.hdsTime.toIsoUtcString(startDate);
    }
  }
  get endDateIsoUtcString() {
    const {
      endDate
    } = this.args;
    if (endDate) {
      return this.hdsTime.toIsoUtcString(endDate);
    }
  }
  get startDateDisplayFormat() {
    const {
      startDate,
      endDate
    } = this.args;
    if (startDate?.getFullYear() !== endDate?.getFullYear()) {
      return {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      };
    } else {
      return {
        month: 'short',
        day: 'numeric',
        year: undefined
      };
    }
  }
  get endDateDisplayFormat() {
    return {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "hdsTime", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
setComponentTemplate(TEMPLATE, HdsTimeRange);

export { HdsTimeRange as default };
//# sourceMappingURL=range.js.map
