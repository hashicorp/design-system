import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsLayoutGridGapValues, HdsLayoutGridAlignValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{!\n  Dynamically generating an HTML tag in Ember creates a dynamic component class (with the corresponding tagName), while rendering\n  a plain HTML element requires less computing cycles for Ember (you will notice it doesn\'t add the `ember-view` class to it).\n}}\n{{#if (eq this.componentTag \"div\")}}\n  <div class={{this.classNames}} {{style this.inlineStyles}} ...attributes>{{yield\n      (hash Item=(component \"hds/layout/grid/item\"))\n    }}</div>\n{{else}}\n  {{#let (element this.componentTag) as |Tag|}}\n    <Tag class={{this.classNames}} {{style this.inlineStyles}} ...attributes>{{yield\n        (hash Item=(component \"hds/layout/grid/item\"))\n      }}</Tag>\n  {{/let}}\n{{/if}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ALIGNS = Object.values(HdsLayoutGridAlignValues);
const DEFAULT_GAP = HdsLayoutGridGapValues.Zero;
const GAPS = Object.values(HdsLayoutGridGapValues);
class HdsLayoutGrid extends Component {
  get componentTag() {
    return this.args.tag ?? 'div';
  }
  get align() {
    const {
      align
    } = this.args;
    if (align) {
      assert(`@align for "Hds::Layout::Grid" must be one of the following: ${ALIGNS.join(', ')}; received: ${align}`, ALIGNS.includes(align));
    }
    return align;
  }
  get gap() {
    const {
      gap = DEFAULT_GAP
    } = this.args;
    if (gap) {
      assert(`@gap for "Hds::Layout::Grid" must be a single value or an array of two values of one of the following: ${GAPS.join(', '
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      )}; received: ${gap}`, !Array.isArray(gap) && GAPS.includes(gap) || Array.isArray(gap) && gap.length === 2 && GAPS.includes(gap[0]) && GAPS.includes(gap[1]));
      return Array.isArray(gap) ? gap : [gap];
    } else {
      return undefined;
    }
  }

  /*
    LOGIC:
     If columnMinWidth is passed in:
    1) we set --hds-layout-grid-column-min-width to the passed in value
    2) We use the fallback value of "auto-fit" for --hds-layout-grid-column-fill-type (reults in a more fluid layout)
     If columnWidth is passed in:
    1) we set --hds-layout-grid-column-min-width to the passed in value
    2) we set --hds-layout-grid-column-fill-type to "auto-fill" (results in a more fixed layout)
     If both columnMinWidth & columnWidth are passed in:
    1) We throw an error, as it doesn't make sense in the context of a CSS grid layout (too complex to determine which to use & desired behavior)
  */
  get inlineStyles() {
    const inlineStyles = {};

    // if both columnMinWidth and columnWidth are passed in, we throw an error
    assert(`@columnMinWidth and @columnWidth for "Hds::Layout::Grid" cannot be used together`, !(this.args.columnMinWidth && this.args.columnWidth));
    if (this.args.columnMinWidth) {
      inlineStyles['--hds-layout-grid-column-min-width'] = this.args.columnMinWidth;
    } else if (this.args.columnWidth) {
      inlineStyles['--hds-layout-grid-column-min-width'] = this.args.columnWidth;
      inlineStyles['--hds-layout-grid-column-fill-type'] = 'auto-fill';
    }
    return inlineStyles;
  }
  get classNames() {
    const classes = ['hds-layout-grid'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-layout-grid--align-items-${this.align}`);
    }

    // add a class based on the @gap argument
    if (this.gap) {
      if (this.gap.length === 2) {
        classes.push(`hds-layout-grid--row-gap-${this.gap[0]}`);
        classes.push(`hds-layout-grid--column-gap-${this.gap[1]}`);
      } else if (this.gap.length === 1) {
        classes.push(`hds-layout-grid--row-gap-${this.gap[0]}`);
        classes.push(`hds-layout-grid--column-gap-${this.gap[0]}`);
      }
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsLayoutGrid);

export { ALIGNS, DEFAULT_GAP, GAPS, HdsLayoutGrid as default };
//# sourceMappingURL=index.js.map
