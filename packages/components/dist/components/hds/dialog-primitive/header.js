import Component from '@glimmer/component';
import { HdsDialogPrimitiveHeaderTitleTagValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class=\"hds-dialog-primitive__header {{if @contextualClassPrefix (concat @contextualClassPrefix \'__header\')}}\"\n  ...attributes\n>\n  {{#if @icon}}\n    <Hds::Icon\n      class=\"hds-dialog-primitive__icon {{if @contextualClassPrefix (concat @contextualClassPrefix \'__icon\')}}\"\n      @name={{@icon}}\n      @size=\"24\"\n    />\n  {{/if}}\n\n  {{#let (element this.titleTag) as |Tag|}}<Tag\n      class=\"hds-dialog-primitive__title {{if @contextualClassPrefix (concat @contextualClassPrefix \'__title\')}}\"\n      id={{@id}}\n    >\n      {{#if @tagline}}\n        <Hds::Text::Body\n          class=\"hds-dialog-primitive__tagline\n            {{if @contextualClassPrefix (concat @contextualClassPrefix \'__tagline\')}}\"\n          @tag=\"div\"\n          @size=\"100\"\n        >\n          {{@tagline}}\n        </Hds::Text::Body>\n      {{/if}}\n\n      <Hds::Text::Display @tag=\"div\" @size=\"300\" @weight=\"semibold\">\n        {{yield}}\n      </Hds::Text::Display>\n    </Tag>\n  {{/let}}\n\n  <Hds::DismissButton\n    class=\"hds-dialog-primitive__dismiss {{if @contextualClassPrefix (concat @contextualClassPrefix \'__dismiss\')}}\"\n    {{on \"click\" this.onDismiss}}\n  />\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const NOOP = () => {};
class HdsDialogPrimitiveHeader extends Component {
  get titleTag() {
    return this.args.titleTag ?? HdsDialogPrimitiveHeaderTitleTagValues.Div;
  }

  /**
   * @param onDismiss
   * @type {function}
   * @default () => {}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss() {
    const {
      onDismiss
    } = this.args;

    // notice: this is a guard used in case the button is used as standalone element (eg. in the showcase)
    // in reality it's always used inside the main components as a yielded component, so the onDismiss handler is always defined
    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return NOOP;
    }
  }
}
setComponentTemplate(TEMPLATE, HdsDialogPrimitiveHeader);

export { HdsDialogPrimitiveHeader as default };
//# sourceMappingURL=header.js.map
