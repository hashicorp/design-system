import Component from '@glimmer/component';
import { HdsAlertTitleTagValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we removed any extra newlines before/after the `let` to reduce the issues with unexpected whitespaces (see https://github.com/hashicorp/design-system/pull/1652) }}\n{{#let (element this.componentTag) as |Tag|}}<Tag\n    class=\"hds-alert__title hds-typography-body-200 hds-font-weight-semibold\"\n    ...attributes\n  >{{yield}}</Tag>{{/let}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAlertTitle extends Component {
  get componentTag() {
    return this.args.tag ?? HdsAlertTitleTagValues.Div;
  }
}
setComponentTemplate(TEMPLATE, HdsAlertTitle);

export { HdsAlertTitle as default };
//# sourceMappingURL=title.js.map
