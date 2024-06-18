import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import '../popover-primitive/index.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { PLACEMENTS as PLACEMENTS$1 } from '../../../modifiers/hds-anchored-position.js';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, InPP.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class=\"hds-rich-tooltip__bubble\"\n  ...attributes\n  id={{@popoverId}}\n  tabindex=\"-1\"\n  role=\"tooltip\"\n  aria-hidden={{(unless @isOpen true)}}\n  {{style this.sizingStyles}}\n  {{@setupPrimitivePopover anchoredPositionOptions=this.anchoredPositionOptions}}\n>\n  <div class=\"hds-rich-tooltip__bubble-arrow\" id={{@arrowId}} />\n  {{#if @isOpen}}\n    <div class=\"hds-rich-tooltip__bubble-inner-content\">\n      {{yield}}\n    </div>\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_PLACEMENT = 'bottom';
const PLACEMENTS = [...PLACEMENTS$1];
class HdsRichTooltipBubbleComponent extends Component {
  /**
   * @param placement
   * @type {string}
   * @description Determines the position of the "popover"
   */
  get placement() {
    const {
      placement = DEFAULT_PLACEMENT
    } = this.args;
    assert(`@placement for "Hds::RichTooltip::Bubble" must be one of the following: ${PLACEMENTS.join(', ')}; received: ${placement}`, PLACEMENTS.includes(placement));
    return placement;
  }
  get enableCollisionDetection() {
    return this.args.enableCollisionDetection ?? true;
  }
  get sizingStyles() {
    const sizingStyles = {};
    if (this.args.width) {
      sizingStyles['width'] = this.args.width;
      sizingStyles['max-width'] = 'none';
    }
    if (this.args.height) {
      sizingStyles['height'] = this.args.height;
      sizingStyles['max-height'] = 'none';
    }
    return sizingStyles;
  }
  get anchoredPositionOptions() {
    // custom options specific for the `RichTooltip` component
    // for details see the `hds-anchored-position` modifier
    return {
      placement: this.placement,
      offsetOptions: this.args.offset ?? 12,
      enableCollisionDetection: this.args.enableCollisionDetection ?? true,
      arrowSelector: `#${this.args.arrowId}`,
      arrowPadding: 12
    };
  }
}
setComponentTemplate(TEMPLATE, HdsRichTooltipBubbleComponent);

export { DEFAULT_PLACEMENT, PLACEMENTS, HdsRichTooltipBubbleComponent as default };
//# sourceMappingURL=bubble.js.map
