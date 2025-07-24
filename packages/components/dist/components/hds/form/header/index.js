import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class={{this.classNames}} ...attributes>\n  {{yield (hash Title=(component \"hds/form/header/title\") Description=(component \"hds/form/header/description\"))}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormHeader extends Component {
  get classNames() {
    const classes = ['hds-form__header'];

    // add a class based on the @isFullWidth argument
    if (this.args.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormHeader);

export { HdsFormHeader as default };
//# sourceMappingURL=index.js.map
