import { _ as _applyDecoratedDescriptor } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{#if @disabled}}\n  <Hds::Interactive class={{this.classNames}} aria-label={{this.content.ariaLabel}} disabled={{true}} ...attributes>\n    <FlightIcon @name={{this.content.icon}} />\n    {{#if this.showLabel}}\n      <Hds::Text::Body\n        class=\"hds-pagination-nav__arrow-label\"\n        @tag=\"span\"\n        @size=\"100\"\n        @weight=\"medium\"\n        aria-hidden=\"true\"\n      >\n        {{this.content.label}}\n      </Hds::Text::Body>\n    {{/if}}\n  </Hds::Interactive>\n{{else}}\n  <Hds::Interactive\n    class={{this.classNames}}\n    @route={{@route}}\n    @query={{hds-link-to-query @query}}\n    @models={{hds-link-to-models @model @models}}\n    @replace={{@replace}}\n    {{on \"click\" this.onClick}}\n    aria-label={{this.content.ariaLabel}}\n    ...attributes\n  >\n    <FlightIcon @name={{this.content.icon}} />\n    {{#if this.showLabel}}\n      <Hds::Text::Body\n        class=\"hds-pagination-nav__arrow-label\"\n        @tag=\"span\"\n        @size=\"100\"\n        @weight=\"medium\"\n        aria-hidden=\"true\"\n      >\n        {{this.content.label}}\n      </Hds::Text::Body>\n    {{/if}}\n  </Hds::Interactive>\n{{/if}}");

var _class;
const DIRECTIONS = ['prev', 'next'];
let HdsPaginationControlArrowComponent = (_class = class HdsPaginationControlArrowComponent extends Component {
  get content() {
    let {
      direction
    } = this.args;
    assert(`@direction for "Pagination::Nav::Arrow" must be one of the following: ${DIRECTIONS.join(', ')}; received: ${direction}`, DIRECTIONS.includes(direction));
    let content;
    if (direction === 'prev') {
      content = {
        label: 'Previous',
        icon: 'chevron-left',
        ariaLabel: 'Previous page'
      };
    }
    if (direction === 'next') {
      content = {
        label: 'Next',
        icon: 'chevron-right',
        ariaLabel: 'Next page'
      };
    }
    return content;
  }

  /**
   * @param showLabel
   * @type {boolean}
   * @default true
   * @description Show the labels for the control
   */
  get showLabel() {
    let {
      showLabel = true
    } = this.args;
    return showLabel;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-pagination-nav__control', 'hds-pagination-nav__arrow', `hds-pagination-nav__arrow--direction-${this.args.direction}`];
    return classes.join(' ');
  }
  onClick() {
    let {
      onClick
    } = this.args;
    if (typeof onClick === 'function') {
      onClick(this.args.direction);
    }
  }
}, (_applyDecoratedDescriptor(_class.prototype, "onClick", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsPaginationControlArrowComponent);

export { DIRECTIONS, HdsPaginationControlArrowComponent as default };
//# sourceMappingURL=arrow.js.map
