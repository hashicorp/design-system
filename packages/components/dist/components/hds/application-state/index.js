import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsApplicationStateAlignValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} ...attributes>\n  {{yield\n    (hash\n      Media=(component \"hds/application-state/media\")\n      Header=(component \"hds/application-state/header\")\n      Body=(component \"hds/application-state/body\")\n      Footer=(component \"hds/application-state/footer\")\n    )\n  }}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ALIGNS = Object.values(HdsApplicationStateAlignValues);
class HdsApplicationState extends Component {
  get align() {
    const validAlignValues = Object.values(HdsApplicationStateAlignValues);
    assert(`@align for "Hds::ApplicationState" must be one of the following: ${validAlignValues.join(', ')}; received: ${this.args.align}`, this.args.align == null || validAlignValues.includes(this.args.align));
    return this.args.align ?? HdsApplicationStateAlignValues.Left;
  }
  get classNames() {
    const classes = ['hds-application-state'];

    // add a class based on the @align argument
    classes.push(`hds-application-state--align-${this.align}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsApplicationState);

export { ALIGNS, HdsApplicationState as default };
//# sourceMappingURL=index.js.map
