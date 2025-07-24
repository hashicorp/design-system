import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Separator class={{this.classNames}} @spacing=\"0\" ...attributes />");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormSeparator extends Component {
  get classNames() {
    const classes = ['hds-form__separator'];

    // add a class based on the @isFullWidth argument
    if (this.args.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormSeparator);

export { HdsFormSeparator as default };
//# sourceMappingURL=index.js.map
