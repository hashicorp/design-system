import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class={{this.classNames}} ...attributes>\n  {{yield (hash LinkStandalone=(component \"hds/link/standalone\"))}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsApplicationStateFooterComponent extends Component {
  /**
   * Indicate if the footer should have a top border or not.
   *
   * @param hasDivider
   * @type {boolean}
   * @default false
   */
  get hasDivider() {
    return this.args.hasDivider ?? false;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-application-state__footer'];

    // add a class based on the existence of @hasDivider argument
    if (this.hasDivider) {
      classes.push(`hds-application-state__footer--has-divider`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsApplicationStateFooterComponent);

export { HdsApplicationStateFooterComponent as default };
//# sourceMappingURL=footer.js.map
