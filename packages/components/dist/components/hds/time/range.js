import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember causes extra space around the time element - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n<span class=\"hds-time hds-time--range\" ...attributes>\n  <time datetime={{this.startDateIsoUtcString}}>\n    {{~hds-format-date @startDate this.startDateDisplayFormat~}}\n  </time>\n  –\n  <time datetime={{this.endDateIsoUtcString}}>\n    {{~hds-format-date @endDate this.endDateDisplayFormat~}}\n  </time>\n</span>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsTimeRange extends Component {
  static {
    g(this.prototype, "hdsTime", [inject]);
  }
  #hdsTime = (i(this, "hdsTime"), undefined);
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
}
setComponentTemplate(TEMPLATE, HdsTimeRange);

export { HdsTimeRange as default };
//# sourceMappingURL=range.js.map
