import { _ as _applyDecoratedDescriptor } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::MenuPrimitive class={{this.classNames}} @onClose={{@onClose}} ...attributes>\n  <:toggle as |t|>\n    {{yield\n      (hash\n        ToggleButton=(component \"hds/dropdown/toggle/button\" isOpen=t.isOpen onClick=t.onClickToggle)\n        ToggleIcon=(component \"hds/dropdown/toggle/icon\" isOpen=t.isOpen onClick=t.onClickToggle)\n      )\n    }}\n  </:toggle>\n  <:content as |c|>\n    <div class={{this.classNamesContent}} {{style width=@width max-height=@height}}>\n      {{yield (hash Header=(component \"hds/dropdown/header\"))}}\n      <ul class=\"hds-dropdown__list\" {{did-insert this.didInsertList}}>\n        {{yield\n          (hash\n            close=c.close\n            Checkbox=(component \"hds/dropdown/list-item/checkbox\")\n            Checkmark=(component \"hds/dropdown/list-item/checkmark\")\n            CopyItem=(component \"hds/dropdown/list-item/copy-item\")\n            Description=(component \"hds/dropdown/list-item/description\")\n            Generic=(component \"hds/dropdown/list-item/generic\")\n            Interactive=(component \"hds/dropdown/list-item/interactive\")\n            Radio=(component \"hds/dropdown/list-item/radio\")\n            Separator=(component \"hds/dropdown/list-item/separator\")\n            Title=(component \"hds/dropdown/list-item/title\")\n          )\n        }}\n      </ul>\n      {{yield (hash close=c.close Footer=(component \"hds/dropdown/footer\"))}}\n    </div>\n  </:content>\n</Hds::MenuPrimitive>");

var _class;
const DEFAULT_POSITION = 'bottom-right';
const POSITIONS = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
let HdsDropdownIndexComponent = (_class = class HdsDropdownIndexComponent extends Component {
  /**
   * @param listPosition
   * @type {string}
   * @default bottom-right
   * @description Determines the position of the "list"
   */
  get listPosition() {
    let {
      listPosition = DEFAULT_POSITION
    } = this.args;
    assert(`@listPosition for "Hds::Dropdown::Index" must be one of the following: ${POSITIONS.join(', ')}; received: ${listPosition}`, POSITIONS.includes(listPosition));
    return listPosition;
  }

  /**
   * Get the class names to apply to the element
   * @method classNames
   * @return {string} The "class" attribute to apply to the root element
   */
  get classNames() {
    let classes = ['hds-dropdown'];

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
    let classes = ['hds-dropdown__content'];

    // add a class based on the @listPosition argument
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
      element.setAttribute('aria-labelledby', toggleButtonId);
    }
  }
}, (_applyDecoratedDescriptor(_class.prototype, "didInsertList", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsertList"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsDropdownIndexComponent);

export { DEFAULT_POSITION, POSITIONS, HdsDropdownIndexComponent as default };
//# sourceMappingURL=index.js.map
