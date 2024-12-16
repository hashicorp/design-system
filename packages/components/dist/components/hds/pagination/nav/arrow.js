import { _ as _applyDecoratedDescriptor } from '../../../../_rollupPluginBabelHelpers-DSLVWx63.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { HdsPaginationDirectionValues, HdsPaginationDirectionLabelValues, HdsPaginationDirectionAriaLabelValues } from '../types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{#if @disabled}}\n  <Hds::Interactive class={{this.classNames}} aria-label={{this.content.ariaLabel}} disabled={{true}} ...attributes>\n    <Hds::Icon @name={{this.content.icon}} />\n    {{#if this.showLabel}}\n      <Hds::Text::Body\n        class=\"hds-pagination-nav__arrow-label\"\n        @tag=\"span\"\n        @size=\"100\"\n        @weight=\"medium\"\n        aria-hidden=\"true\"\n      >\n        {{this.content.label}}\n      </Hds::Text::Body>\n    {{/if}}\n  </Hds::Interactive>\n{{else}}\n  <Hds::Interactive\n    class={{this.classNames}}\n    @route={{@route}}\n    @query={{hds-link-to-query @query}}\n    @models={{hds-link-to-models @model @models}}\n    @replace={{@replace}}\n    {{on \"click\" this.onClick}}\n    aria-label={{this.content.ariaLabel}}\n    ...attributes\n  >\n    <Hds::Icon @name={{this.content.icon}} />\n    {{#if this.showLabel}}\n      <Hds::Text::Body\n        class=\"hds-pagination-nav__arrow-label\"\n        @tag=\"span\"\n        @size=\"100\"\n        @weight=\"medium\"\n        aria-hidden=\"true\"\n      >\n        {{this.content.label}}\n      </Hds::Text::Body>\n    {{/if}}\n  </Hds::Interactive>\n{{/if}}");

var _class;
const DIRECTIONS = [HdsPaginationDirectionValues.Prev, HdsPaginationDirectionValues.Next];
let HdsPaginationControlArrow = (_class = class HdsPaginationControlArrow extends Component {
  get content() {
    const {
      direction
    } = this.args;
    assert(`@direction for "Pagination::Nav::Arrow" must be one of the following: ${DIRECTIONS.join(', ')}; received: ${direction}`, DIRECTIONS.includes(direction));
    const hdsPaginationNavArrowContentDirectionMap = {
      [HdsPaginationDirectionValues.Prev]: {
        label: HdsPaginationDirectionLabelValues.Prev,
        icon: 'chevron-left',
        ariaLabel: HdsPaginationDirectionAriaLabelValues.Prev
      },
      [HdsPaginationDirectionValues.Next]: {
        label: HdsPaginationDirectionLabelValues.Next,
        icon: 'chevron-right',
        ariaLabel: HdsPaginationDirectionAriaLabelValues.Next
      }
    };
    return hdsPaginationNavArrowContentDirectionMap[direction];
  }
  get showLabel() {
    const {
      showLabel = true
    } = this.args;
    return showLabel;
  }
  get classNames() {
    const classes = ['hds-pagination-nav__control', 'hds-pagination-nav__arrow', `hds-pagination-nav__arrow--direction-${this.args.direction}`];
    return classes.join(' ');
  }
  onClick() {
    const {
      onClick
    } = this.args;
    if (typeof onClick === 'function') {
      onClick(this.args.direction);
    }
  }
}, (_applyDecoratedDescriptor(_class.prototype, "onClick", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsPaginationControlArrow);

export { DIRECTIONS, HdsPaginationControlArrow as default };
//# sourceMappingURL=arrow.js.map
