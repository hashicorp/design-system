import TemplateOnlyComponent from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-application-state__body\" ...attributes>\n  {{#if (has-block)}}\n    {{yield}}\n  {{else}}\n    <Hds::Text::Body class=\"hds-application-state__body-text\" @tag=\"p\" @size=\"300\">\n      {{@text}}\n    </Hds::Text::Body>\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const HdsApplicationStateBody = TemplateOnlyComponent();
var body = setComponentTemplate(TEMPLATE, HdsApplicationStateBody);

export { body as default };
//# sourceMappingURL=body.js.map
