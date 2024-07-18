import Component from '@glimmer/component';
import { HdsApplicationStateAlignValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} ...attributes>\n  {{yield\n    (hash\n      Media=(component \"hds/application-state/media\")\n      Header=(component \"hds/application-state/header\")\n      Body=(component \"hds/application-state/body\")\n      Footer=(component \"hds/application-state/footer\")\n    )\n  }}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsApplicationStateComponent extends Component {
  get align() {
    return this.args.align ?? HdsApplicationStateAlignValues.Left;
  }
  get classNames() {
    const classes = ['hds-application-state'];
    if (this.align === HdsApplicationStateAlignValues.Center) {
      classes.push('hds-application-state--align-center');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsApplicationStateComponent);

export { HdsApplicationStateComponent as default };
//# sourceMappingURL=index.js.map
