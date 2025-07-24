import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember causes the empty element to still occupy space - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n<div class={{this.classNames}} ...attributes>\n  {{~yield\n    (hash\n      Header=(component \"hds/form/section/header\")\n      HeaderTitle=(component \"hds/form/header/title\" size=\"300\")\n      HeaderDescription=(component \"hds/form/header/description\")\n      MultiFieldGroup=(component \"hds/form/section/multi-field-group\")\n      MultiFieldGroupItem=(component \"hds/form/section/multi-field-group/item\")\n    )\n  ~}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormSection extends Component {
  get classNames() {
    const classes = ['hds-form__section'];

    // add a class based on the @isFullWidth argument
    if (this.args.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormSection);

export { HdsFormSection as default };
//# sourceMappingURL=index.js.map
