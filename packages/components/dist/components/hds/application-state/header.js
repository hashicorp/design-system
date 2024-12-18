import Component from '@glimmer/component';
import { HdsApplicationStateTitleTagValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-application-state__header\" ...attributes>\n  {{#if @errorCode}}\n    <Hds::Text::Body class=\"hds-application-state__error-code\" @tag=\"div\" @size=\"100\" @weight=\"medium\" @color=\"faint\">\n      ERROR\n      {{@errorCode}}\n    </Hds::Text::Body>\n  {{/if}}\n  {{#if @icon}}\n    <div class=\"hds-application-state__icon\">\n      <Hds::Icon @color=\"var(--token-color-foreground-strong)\" @name={{@icon}} @size=\"24\" @isInline={{true}} />\n    </div>\n  {{/if}}\n  <Hds::Text::Display\n    class=\"hds-application-state__title\"\n    @tag={{this.titleTag}}\n    @size=\"300\"\n    @weight=\"semibold\"\n    @color=\"strong\"\n  >\n    {{@title}}\n  </Hds::Text::Display>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsApplicationStateHeader extends Component {
  get titleTag() {
    return this.args.titleTag ?? HdsApplicationStateTitleTagValues.Div;
  }
}
setComponentTemplate(TEMPLATE, HdsApplicationStateHeader);

export { HdsApplicationStateHeader as default };
//# sourceMappingURL=header.js.map
