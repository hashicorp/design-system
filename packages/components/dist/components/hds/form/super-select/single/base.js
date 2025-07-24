import Component from '@glimmer/component';
import anchoredPositionModifier from '../../../../../modifiers/hds-anchored-position.js';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { HdsFormSuperSelectHorizontalPositionValues, HdsFormSuperSelectHorizontalPositionToPlacementValues } from '../types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! Important: if an argument is added in base.hbs, it must also be added/processed in the Base component used in field.hbs }}\n<div class={{this.classNames}} {{style this.dropdownMaxWidthStyle}}>\n  <PowerSelect\n    @afterOptionsComponent={{if\n      this.showAfterOptions\n      (or\n        @afterOptionsComponent\n        (component\n          \"hds/form/super-select/after-options\"\n          content=@afterOptionsContent\n          resultCountMessage=this.resultCountMessageText\n        )\n      )\n    }}\n    @ariaDescribedBy={{@ariaDescribedBy}}\n    @ariaInvalid={{@ariaInvalid}}\n    @ariaLabel={{@ariaLabel}}\n    @ariaLabelledBy={{@ariaLabelledBy}}\n    @beforeOptionsComponent={{@beforeOptionsComponent}}\n    @calculatePosition={{if @verticalPosition undefined this.calculatePosition}}\n    @closeOnSelect={{@closeOnSelect}}\n    @disabled={{@disabled}}\n    @dropdownClass={{@dropdownClass}}\n    @extra={{@extra}}\n    @groupComponent={{component \"hds/form/super-select/option-group\"}}\n    @horizontalPosition={{@horizontalPosition}}\n    @initiallyOpened={{@initiallyOpened}}\n    @labelText={{@labelText}}\n    @loadingMessage={{@loadingMessage}}\n    @matcher={{@matcher}}\n    @matchTriggerWidth={{if @dropdownMaxWidth false @matchTriggerWidth}}\n    @noMatchesMessage={{@noMatchesMessage}}\n    @onBlur={{@onBlur}}\n    @onChange={{@onChange}}\n    @onClose={{@onClose}}\n    @onFocus={{@onFocus}}\n    @onInput={{@onInput}}\n    @onKeydown={{@onKeydown}}\n    @onOpen={{@onOpen}}\n    @options={{@options}}\n    @optionsComponent={{@optionsComponent}}\n    @placeholder={{@placeholder}}\n    @placeholderComponent={{component \"hds/form/super-select/placeholder\"}}\n    @preventScroll={{@preventScroll}}\n    @registerAPI={{this.setPowerSelectAPI}}\n    @renderInPlace={{true}}\n    @resultCountMessage={{this.resultCountMessageFunction}}\n    @scrollTo={{@scrollTo}}\n    @search={{@search}}\n    @searchEnabled={{@searchEnabled}}\n    @searchField={{@searchField}}\n    @searchFieldPosition=\"before-options\"\n    @searchMessage={{@searchMessage}}\n    @searchPlaceholder={{this.searchPlaceholder}}\n    @selected={{@selected}}\n    @selectedItemComponent={{@selectedItemComponent}}\n    @tabindex={{@tabindex}}\n    @triggerClass={{@triggerClass}}\n    @triggerComponent={{@triggerComponent}}\n    @triggerId={{@triggerId}}\n    @triggerRole={{@triggerRole}}\n    @typeAheadOptionMatcher={{@typeAheadOptionMatcher}}\n    @verticalPosition={{@verticalPosition}}\n    ...attributes\n    as |option select|\n  >\n    <Hds::Text::Body>{{yield option select}}</Hds::Text::Body>\n  </PowerSelect>\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_HORIZONTAL_POSITION = HdsFormSuperSelectHorizontalPositionValues.Left;
const HORIZONTAL_POSITION_MAPPING = HdsFormSuperSelectHorizontalPositionToPlacementValues;
class HdsFormSuperSelectSingleBase extends Component {
  static {
    g(this.prototype, "powerSelectAPI", [tracked]);
  }
  #powerSelectAPI = (i(this, "powerSelectAPI"), void 0);
  get horizontalPosition() {
    const {
      horizontalPosition = DEFAULT_HORIZONTAL_POSITION
    } = this.args;
    return horizontalPosition;
  }
  get resultCountMessageText() {
    if (typeof this.args.resultCountMessage === 'string') {
      return this.args.resultCountMessage;
    }
    return `${this.powerSelectAPI?.resultsCount || 0} total`;
  }
  get resultCountMessageFunction() {
    if (typeof this.args.resultCountMessage === 'function') {
      return this.args.resultCountMessage;
    }
    return undefined;
  }

  /**
   * This action sets the powerSelectAPI property and optionally calls a registerAPI function.
   *
   * @param {Object} powerSelectAPI - The API object for the PowerSelect component.
   *
   * If a `registerAPI` function is passed in through the component's arguments,
   * this function will be called with the `powerSelectAPI` as its argument.
   * This allows parent components or controllers to have access to the PowerSelect API.
   *
   * The `powerSelectAPI` is also stored on the component instance and used in `clearSelected`
   */
  setPowerSelectAPI(powerSelectAPI) {
    if (typeof this.args.registerAPI === 'function') {
      this.args.registerAPI(powerSelectAPI);
    }
    this.powerSelectAPI = powerSelectAPI;
  }
  static {
    n(this.prototype, "setPowerSelectAPI", [action]);
  }
  calculatePosition(trigger, content) {
    // use `hds-anchored-position` to calculate and set position
    // @ts-expect-error: known issue with type of invocation
    anchoredPositionModifier(content, [trigger], {
      placement: HORIZONTAL_POSITION_MAPPING[this.horizontalPosition],
      offsetOptions: 4,
      enableCollisionDetection: true
    });
    // prevent PowerSelect from setting position
    return {
      horizontalPosition: 'auto',
      verticalPosition: 'auto',
      style: {}
    };
  }

  /**
   * Determine if `@afterOptionsComponent` gets displayed
   * @param showAfterOptions
   * @type {boolean}
   * @default false
   */
  static {
    n(this.prototype, "calculatePosition", [action]);
  }
  get showAfterOptions() {
    return this.args.showAfterOptions ?? this.args.afterOptionsContent ?? false;
  }

  /**
   * Get the search placeholder text
   * @param searchPlaceholder
   * @type {string}
   * @default 'Search'
   */
  get searchPlaceholder() {
    return this.args.searchPlaceholder ?? 'Search';
  }

  /**
   * Get the maxWidth to apply to the dropdown
   * @param dropdownMaxWidth
   * @type {string}
   * @default 'none'
   */
  get dropdownMaxWidthStyle() {
    const maxWidthStyle = {};
    if (this.args.dropdownMaxWidth) {
      maxWidthStyle['--hds-form-super-select-dropdown-max-width'] = this.args.dropdownMaxWidth;
    }
    return maxWidthStyle;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-form-super-select', 'hds-form-super-select-single'];

    // add a class based on the @matchTriggerWidth argument or whether dropdownMaxWidth is set
    if (this.args.matchTriggerWidth === false || this.args.dropdownMaxWidth) {
      classes.push('hds-form-super-select--dropdown-content-auto-width');
    }

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-super-select--is-invalid`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormSuperSelectSingleBase);

export { DEFAULT_HORIZONTAL_POSITION, HORIZONTAL_POSITION_MAPPING, HdsFormSuperSelectSingleBase as default };
//# sourceMappingURL=base.js.map
