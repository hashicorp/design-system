import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class={{this.classNames}} ...attributes>\n  {{yield (hash ExtraBefore=(component \"hds/yield\"))}}\n  <ul class=\"hds-app-footer__list\" aria-label={{this.ariaLabel}}>\n    {{yield (hash StatusLink=(component \"hds/app-footer/status-link\"))}}\n    {{yield\n      (hash\n        Link=(component \"hds/app-footer/link\")\n        LegalLinks=(component \"hds/app-footer/legal-links\")\n        Item=(component \"hds/app-footer/item\")\n      )\n    }}\n  </ul>\n  {{yield (hash ExtraAfter=(component \"hds/yield\"))}}\n  <Hds::AppFooter::Copyright @year={{@copyrightYear}} />\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFooterComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Footer items'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Footer items';
  }

  /**
   * @param theme
   * @type {HdsAppFooterThemeTypes}
   * @description The component theme
   * @default 'light'
   */
  get theme() {
    return this.args.theme ?? 'light';
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-app-footer'];

    // add a class based on the @theme argument
    classes.push(`hds-app-footer--theme-${this.theme}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsAppFooterComponent);

export { HdsAppFooterComponent as default };
//# sourceMappingURL=index.js.map
