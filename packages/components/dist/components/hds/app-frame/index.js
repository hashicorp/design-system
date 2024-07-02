import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class=\"hds-app-frame\" ...attributes>\n  {{#if this.hasHeader}}\n    {{yield (hash Header=(component \"hds/app-frame/parts/header\"))}}\n  {{/if}}\n  {{#if this.hasSidebar}}\n    {{yield (hash Sidebar=(component \"hds/app-frame/parts/sidebar\"))}}\n  {{/if}}\n  {{!\n    IMPORTANT: since the modals may be injected via portal or `in-element` with code that lives in the \"main\" container,\n    the \"modal\" container needs to be present in the DOM _before_ the \"main\" block, otherwise it may cause errors\n    where the target DOM element is not found (for example in tests where the modal may be immediately opened on first render).\n  }}\n  {{#if this.hasModals}}\n    {{yield (hash Modals=(component \"hds/app-frame/parts/modals\"))}}\n  {{/if}}\n  {{yield (hash Main=(component \"hds/app-frame/parts/main\"))}}\n  {{#if this.hasFooter}}\n    {{yield (hash Footer=(component \"hds/app-frame/parts/footer\"))}}\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAppFrameComponent extends Component {
  /**
   * Indicates if the "header" container should be displayed
   *
   * @param hasHeader
   * @type {boolean}
   * @default true
   */
  get hasHeader() {
    return this.args.hasHeader ?? true;
  }

  /**
   * Indicates if the "sidebar" container should be displayed
   *
   * @param hasSidebar
   * @type {boolean}
   * @default true
   */
  get hasSidebar() {
    return this.args.hasSidebar ?? true;
  }

  /**
   * Indicates if the "footer" container should be displayed
   *
   * @param hasFooter
   * @type {boolean}
   * @default true
   */
  get hasFooter() {
    return this.args.hasFooter ?? true;
  }

  /**
   * Indicates if the "modals" container should be displayed
   *
   * @param hasModals
   * @type {boolean}
   * @default true
   */
  get hasModals() {
    return this.args.hasModals ?? true;
  }
}
setComponentTemplate(TEMPLATE, HdsAppFrameComponent);

export { HdsAppFrameComponent as default };
//# sourceMappingURL=index.js.map
