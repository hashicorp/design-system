import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Copy::Button\n  class=\"hds-code-block__copy-button\"\n  @text={{this.text}}\n  @isIconOnly={{true}}\n  @size=\"small\"\n  @targetToCopy={{@targetToCopy}}\n  ...attributes\n/>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsCodeBlockCopyButton extends Component {
  get text() {
    return this.args.text ? this.args.text : 'Copy';
  }
}
setComponentTemplate(TEMPLATE, HdsCodeBlockCopyButton);

export { HdsCodeBlockCopyButton as default };
//# sourceMappingURL=copy-button.js.map
