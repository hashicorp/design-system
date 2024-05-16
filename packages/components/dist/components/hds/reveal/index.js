import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::DisclosurePrimitive class=\"hds-reveal\" @isOpen={{@isOpen}} ...attributes>\n  <:toggle as |t|>\n    <Hds::Reveal::Toggle::Button\n      aria-controls={{this.contentId}}\n      @text={{if (and t.isOpen @textWhenOpen) @textWhenOpen this.text}}\n      @isOpen={{t.isOpen}}\n      {{on \"click\" t.onClickToggle}}\n    />\n  </:toggle>\n\n  <:content>\n    <div class=\"hds-reveal__content hds-typography-body-200 hds-foreground-primary\" id={{this.contentId}}>\n      {{yield}}\n    </div>\n  </:content>\n</Hds::DisclosurePrimitive>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsRevealIndexComponent extends Component {
  /**
   * Generates a unique ID for the Content
   *
   * @param contentId
   */
  contentId = 'content-' + guidFor(this);

  /**
   * @param text
   * @type {string}
   * @description The text of the button.
   */
  get text() {
    let {
      text
    } = this.args;
    assert('@text for "Hds::Reveal" must have a valid value', text !== undefined);
    return text;
  }
}
setComponentTemplate(TEMPLATE, HdsRevealIndexComponent);

export { HdsRevealIndexComponent as default };
//# sourceMappingURL=index.js.map
