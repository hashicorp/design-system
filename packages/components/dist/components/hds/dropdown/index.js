import { _ as _applyDecoratedDescriptor } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { HdsDropdownPositionValues, HdsDropdownPositionToPlacementValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::PopoverPrimitive @isOpen={{@isOpen}} @onClose={{@onClose}} @enableClickEvents={{true}} as |PP|>\n  <div class={{this.classNames}} ...attributes {{PP.setupPrimitiveContainer}}>\n    {{yield\n      (hash\n        ToggleButton=(component\n          \"hds/dropdown/toggle/button\" isOpen=PP.isOpen setupPrimitiveToggle=PP.setupPrimitiveToggle\n        )\n        ToggleIcon=(component \"hds/dropdown/toggle/icon\" isOpen=PP.isOpen setupPrimitiveToggle=PP.setupPrimitiveToggle)\n      )\n    }}\n    <div\n      class={{this.classNamesContent}}\n      {{style width=@width max-height=@height}}\n      {{PP.setupPrimitivePopover anchoredPositionOptions=this.anchoredPositionOptions}}\n    >\n      {{yield (hash Header=(component \"hds/dropdown/header\"))}}\n      <ul class=\"hds-dropdown__list\" {{did-insert this.didInsertList}}>\n        {{yield\n          (hash\n            close=PP.hidePopover\n            isOpen=PP.isOpen\n            Checkbox=(component \"hds/dropdown/list-item/checkbox\")\n            Checkmark=(component \"hds/dropdown/list-item/checkmark\")\n            CopyItem=(component \"hds/dropdown/list-item/copy-item\")\n            Description=(component \"hds/dropdown/list-item/description\")\n            Generic=(component \"hds/dropdown/list-item/generic\")\n            Interactive=(component \"hds/dropdown/list-item/interactive\")\n            Radio=(component \"hds/dropdown/list-item/radio\")\n            Separator=(component \"hds/dropdown/list-item/separator\")\n            Title=(component \"hds/dropdown/list-item/title\")\n          )\n        }}\n      </ul>\n      {{yield (hash close=PP.hidePopover Footer=(component \"hds/dropdown/footer\"))}}\n    </div>\n  </div>\n</Hds::PopoverPrimitive>");

var _class;
const DEFAULT_POSITION = HdsDropdownPositionValues.BottomRight;
const POSITIONS = Object.values(HdsDropdownPositionValues);
let HdsDropdown = (_class = class HdsDropdown extends Component {
  /**
   * @param listPosition
   * @type {string}
   * @default bottom-right
   * @description Determines the position of the "list"
   */
  get listPosition() {
    const {
      listPosition = DEFAULT_POSITION
    } = this.args;
    assert(`@listPosition for "Hds::Dropdown::Index" must be one of the following: ${POSITIONS.join(', ')}; received: ${listPosition}`, POSITIONS.includes(listPosition));
    return listPosition;
  }
  get enableCollisionDetection() {
    return this.args.enableCollisionDetection ?? false;
  }
  get anchoredPositionOptions() {
    // custom options specific for the `RichTooltip` component
    // for details see the `hds-anchored-position` modifier
    return {
      placement: HdsDropdownPositionToPlacementValues[this.listPosition],
      offsetOptions: 4,
      enableCollisionDetection: this.enableCollisionDetection ? 'flip' : false
    };
  }

  /**
   * Get the class names to apply to the element
   * @method classNames
   * @return {string} The "class" attribute to apply to the root element
   */
  get classNames() {
    const classes = ['hds-dropdown'];

    // add a class based on the @isInline argument
    if (this.args.isInline) {
      classes.push('hds-dropdown--is-inline');
    }
    return classes.join(' ');
  }

  /**
   * Get the class names to apply to the content
   * @method classNamesContent
   * @return {string} The "class" attribute to apply to the disclosed content
   */
  get classNamesContent() {
    const classes = ['hds-dropdown__content'];

    // add a class based on the @listPosition argument
    // TODO: we preserved these classes to avoid introducing breaking changes for consumers who rely on these classes for tests, but we aim to remove them in the next major release
    // context: https://github.com/hashicorp/design-system/pull/2309#discussion_r1706941892
    classes.push(`hds-dropdown__content--position-${this.listPosition}`);

    // add a class based on the @width argument
    if (this.args.width) {
      classes.push('hds-dropdown__content--fixed-width');
    }
    return classes.join(' ');
  }
  didInsertList(element) {
    const checkmarkItems = element.querySelectorAll(`[role="option"]`);
    if (checkmarkItems.length) {
      const toggleButtonId = element.closest('.hds-dropdown')?.querySelector('.hds-dropdown-toggle-button')?.getAttribute('id');
      element.setAttribute('role', 'listbox');
      if (toggleButtonId) {
        element.setAttribute('aria-labelledby', toggleButtonId);
      }
    }
  }
}, (_applyDecoratedDescriptor(_class.prototype, "didInsertList", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsertList"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsDropdown);

export { DEFAULT_POSITION, POSITIONS, HdsDropdown as default };
//# sourceMappingURL=index.js.map
