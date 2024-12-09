import Component from '@glimmer/component';
import { HdsCodeBlockTitleTagValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Text::Body @size=\"200\" @tag={{this.componentTag}} @weight=\"semibold\" class=\"hds-code-block__title\" ...attributes>\n  {{yield}}\n</Hds::Text::Body>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
class HdsCodeBlockTitle extends Component {
  get componentTag() {
    return this.args.tag ?? HdsCodeBlockTitleTagValues.P;
  }
}
setComponentTemplate(TEMPLATE, HdsCodeBlockTitle);

export { HdsCodeBlockTitle as default };
//# sourceMappingURL=title.js.map
