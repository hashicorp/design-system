import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Copy::Button\n  class=\"hds-code-block__copy-button\"\n  @text=\"Copy\"\n  @isIconOnly={{true}}\n  @size=\"small\"\n  @targetToCopy={{@targetToCopy}}\n  ...attributes\n/>");

var copyButton = setComponentTemplate(TEMPLATE, templateOnly());

export { copyButton as default };
//# sourceMappingURL=copy-button.js.map
