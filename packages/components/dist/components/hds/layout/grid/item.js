import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{!\n  Dynamically generating an HTML tag in Ember creates a dynamic component class (with the corresponding tagName), while rendering\n  a plain HTML element requires less computing cycles for Ember (you will notice it doesn\'t add the `ember-view` class to it).\n}}\n{{#if (eq this.componentTag \"div\")}}\n  <div class=\"hds-layout-grid-item\" {{style this.inlineStyles}} ...attributes>{{yield}}</div>\n{{else}}\n  {{#let (element this.componentTag) as |Tag|}}\n    <Tag class=\"hds-layout-grid-item\" {{style this.inlineStyles}} ...attributes>{{yield}}</Tag>\n  {{/let}}\n{{/if}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsLayoutGridItem extends Component {
  get componentTag() {
    return this.args.tag ?? 'div';
  }
  get inlineStyles() {
    const inlineStyles = {};
    if (this.args.colspan) {
      inlineStyles['--hds-layout-grid-column-span'] = this.args.colspan.toString();
    }
    if (this.args.rowspan) {
      inlineStyles['--hds-layout-grid-row-span'] = this.args.rowspan.toString();
    }
    return inlineStyles;
  }
}
setComponentTemplate(TEMPLATE, HdsLayoutGridItem);

export { HdsLayoutGridItem as default };
//# sourceMappingURL=item.js.map
