import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-81503waH.js';
import Component from '@glimmer/component';
import { typeOf } from '@ember/utils';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember causes extra space around the time element - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n{{~#let this.display as |display|~}}\n  {{~#if this.isValidDate~}}\n    {{~#if this.hasTooltip~}}\n      <Hds::TooltipButton\n        class=\"hds-time-wrapper\"\n        @text={{if\n          display.options.tooltipFormat\n          (hds-format-date this.date display.options.tooltipFormat)\n          this.isoUtcString\n        }}\n        @placement=\"bottom\"\n        @extraTippyOptions={{hash showOnCreate=this.isOpen}}\n      >\n        <Hds::Time::Single\n          @date={{this.date}}\n          @isoUtcString={{this.isoUtcString}}\n          @display={{this.display}}\n          @register={{this.didInsertNode}}\n          @unregister={{this.willDestroyNode}}\n          ...attributes\n        />\n      </Hds::TooltipButton>\n    {{~else~}}\n      <Hds::Time::Single\n        @date={{this.date}}\n        @isoUtcString={{this.isoUtcString}}\n        @display={{this.display}}\n        @register={{this.didInsertNode}}\n        @unregister={{this.willDestroyNode}}\n        ...attributes\n      />\n    {{~/if~}}\n  {{~else if this.isValidDateRange~}}\n    {{~#if this.hasTooltip~}}\n      <Hds::TooltipButton\n        class=\"hds-time-wrapper\"\n        @text={{if\n          display.options.tooltipFormat\n          (concat\n            (hds-format-date this.startDate display.options.tooltipFormat)\n            (hds-format-date this.endDate display.options.tooltipFormat)\n          )\n          this.rangeIsoUtcString\n        }}\n        @placement=\"bottom\"\n        @extraTippyOptions={{hash showOnCreate=this.isOpen}}\n      >\n        <Hds::Time::Range @startDate={{this.startDate}} @endDate={{this.endDate}} ...attributes />\n      </Hds::TooltipButton>\n    {{~else~}}\n      <Hds::Time::Range @startDate={{this.startDate}} @endDate={{this.endDate}} ...attributes />\n    {{~/if~}}\n  {{~/if~}}\n{{~/let~}}");

var _class, _descriptor;
const dateIsValid = date => date instanceof Date && !isNaN(+date);
let HdsTime = (_class = class HdsTime extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "hdsTime", _descriptor, this);
  }
  get date() {
    const {
      date
    } = this.args;

    // Sometimes an ISO date string might be passed in instead of a JS Date.
    if (date) {
      if (typeOf(date) === 'string') {
        return new Date(date);
      } else if (date instanceof Date) {
        return date;
      }
    }
  }
  get startDate() {
    const {
      startDate
    } = this.args;
    if (startDate) {
      if (typeOf(startDate) === 'string') {
        return new Date(startDate);
      } else if (startDate instanceof Date) {
        return startDate;
      }
    }
  }
  get endDate() {
    const {
      endDate
    } = this.args;
    if (endDate) {
      if (typeOf(endDate) === 'string') {
        return new Date(endDate);
      } else if (endDate instanceof Date) {
        return endDate;
      }
    }
  }
  get isValidDate() {
    return dateIsValid(this.date);
  }
  get isValidDateRange() {
    if (dateIsValid(this.startDate) && dateIsValid(this.endDate)) {
      return this.startDate <= this.endDate;
    }
    return false;
  }
  get hasTooltip() {
    return this.args.hasTooltip ?? true;
  }
  get isoUtcString() {
    const date = this.date;
    if (dateIsValid(date)) {
      return this.hdsTime.toIsoUtcString(date);
    }
    return undefined;
  }
  get rangeIsoUtcString() {
    const startDate = this.startDate;
    const endDate = this.endDate;
    if (dateIsValid(startDate) && dateIsValid(endDate)) {
      return `${this.hdsTime.toIsoUtcString(startDate)}–${this.hdsTime.toIsoUtcString(endDate)}`;
    }
    return '';
  }
  get display() {
    const date = this.date;
    const {
      display
    } = this.args;
    if (dateIsValid(date)) {
      const nextDiff = this.hdsTime.timeDifference(this.hdsTime.now, date);
      return this.hdsTime.format(nextDiff, display);
    }
    return {
      options: undefined,
      difference: {
        absValueInMs: 0,
        valueInMs: 0
      },
      relative: {
        value: 0,
        unit: ''
      }
    };
  }
  get isOpen() {
    return this.args.isOpen ?? false;
  }
  didInsertNode() {
    const date = this.date;
    if (dateIsValid(date)) {
      this.hdsTime.register(date);
    }
  }
  willDestroyNode() {
    const date = this.date;
    if (dateIsValid(date)) {
      this.hdsTime.unregister(date);
    }
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "hdsTime", [inject], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "didInsertNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsertNode"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroyNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroyNode"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsTime);

export { HdsTime as default };
//# sourceMappingURL=index.js.map
