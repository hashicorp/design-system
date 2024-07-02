import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-application-state__header\" ...attributes>\n  {{#if @icon}}\n    <div class=\"hds-application-state__icon\">\n      <FlightIcon @name={{@icon}} @size=\"24\" />\n    </div>\n  {{/if}}\n  <Hds::Text::Display class=\"hds-application-state__title\" @tag=\"div\" @size=\"400\" @weight=\"semibold\">\n    {{@title}}\n  </Hds::Text::Display>\n  {{#if @errorCode}}\n    <Hds::Text::Body class=\"hds-application-state__error-code\" @tag=\"div\" @size=\"100\" @weight=\"medium\">\n      Error\n      {{@errorCode}}\n    </Hds::Text::Body>\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsApplicationStateHeaderComponent = templateOnly();
var header = setComponentTemplate(TEMPLATE, HdsApplicationStateHeaderComponent);

export { header as default };
//# sourceMappingURL=header.js.map
