import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsLayoutFlexDirectionValues, HdsLayoutFlexGapValues, HdsLayoutFlexJustifyValues, HdsLayoutFlexAlignValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{!\n  Dynamically generating an HTML tag in Ember creates a dynamic component class (with the corresponding tagName), while rendering\n  a plain HTML element requires less computing cycles for Ember (you will notice it doesn\'t add the `ember-view` class to it).\n}}\n{{#if (eq this.componentTag \"div\")}}\n  <div class={{this.classNames}} ...attributes>{{yield (hash Item=(component \"hds/layout/flex/item\"))}}</div>\n{{else}}\n  {{#let (element this.componentTag) as |Tag|}}\n    <Tag class={{this.classNames}} ...attributes>{{yield (hash Item=(component \"hds/layout/flex/item\"))}}</Tag>\n  {{/let}}\n{{/if}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_DIRECTION = HdsLayoutFlexDirectionValues.Row;
const DIRECTIONS = Object.values(HdsLayoutFlexDirectionValues);
const JUSTIFYS = Object.values(HdsLayoutFlexJustifyValues);
const ALIGNS = Object.values(HdsLayoutFlexAlignValues);
const DEFAULT_GAP = HdsLayoutFlexGapValues.Zero;
const GAPS = Object.values(HdsLayoutFlexGapValues);
class HdsLayoutFlex extends Component {
  get componentTag() {
    return this.args.tag ?? 'div';
  }
  get direction() {
    const {
      direction = DEFAULT_DIRECTION
    } = this.args;
    assert(`@direction for "Hds::Layout::Flex" must be one of the following: ${DIRECTIONS.join(', ')}; received: ${direction}`, DIRECTIONS.includes(direction));
    return direction;
  }
  get justify() {
    const {
      justify
    } = this.args;
    if (justify) {
      assert(`@justify for "Hds::Layout::Flex" must be one of the following: ${JUSTIFYS.join(', ')}; received: ${justify}`, JUSTIFYS.includes(justify));
    }
    return justify;
  }
  get align() {
    const {
      align
    } = this.args;
    if (align) {
      assert(`@align for "Hds::Layout::Flex" must be one of the following: ${ALIGNS.join(', ')}; received: ${align}`, ALIGNS.includes(align));
    }
    return align;
  }
  get gap() {
    const {
      gap = DEFAULT_GAP
    } = this.args;
    if (gap) {
      assert(`@gap for "Hds::Layout::Flex" must be a single value or an array of two values of one of the following: ${GAPS.join(', '
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      )}; received: ${gap}`, !Array.isArray(gap) && GAPS.includes(gap) || Array.isArray(gap) && gap.length === 2 && GAPS.includes(gap[0]) && GAPS.includes(gap[1]));
      return Array.isArray(gap) ? gap : [gap];
    } else {
      return undefined;
    }
  }
  get classNames() {
    const classes = ['hds-layout-flex'];

    // add a class based on the @direction argument
    classes.push(`hds-layout-flex--direction-${this.direction}`);

    // add a class based on the @justify argument
    if (this.justify) {
      classes.push(`hds-layout-flex--justify-content-${this.justify}`);
    }

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-layout-flex--align-items-${this.align}`);
    }

    // add a class based on the @gap argument
    if (this.gap) {
      if (this.gap.length === 2) {
        classes.push(`hds-layout-flex--row-gap-${this.gap[0]}`);
        classes.push(`hds-layout-flex--column-gap-${this.gap[1]}`);
      } else if (this.gap.length === 1) {
        classes.push(`hds-layout-flex--row-gap-${this.gap[0]}`);
        classes.push(`hds-layout-flex--column-gap-${this.gap[0]}`);
      }
    }

    // add a class based on the @wrap argument
    if (this.args.wrap) {
      classes.push('hds-layout-flex--has-wrapping');
    }

    // add a class based on the @isInline argument
    if (this.args.isInline) {
      classes.push('hds-layout-flex--is-inline');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsLayoutFlex);

export { ALIGNS, DEFAULT_DIRECTION, DEFAULT_GAP, DIRECTIONS, GAPS, JUSTIFYS, HdsLayoutFlex as default };
//# sourceMappingURL=index.js.map
