import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../../../_rollupPluginBabelHelpers-81503waH.js';
import Component from '@glimmer/component';
import anchoredPositionModifier from '../../../../../modifiers/hds-anchored-position.js';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { HdsFormSuperSelectHorizontalPositionValues, HdsFormSuperSelectHorizontalPositionToPlacementValues } from '../types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! Important: if an argument is added in base.hbs, it must also be added/processed in the Base component used in field.hbs }}\n<div class={{this.classNames}} {{style this.dropdownMaxWidthStyle}}>\n  <PowerSelectMultiple\n    @afterOptionsComponent={{if\n      this.showAfterOptions\n      (or\n        @afterOptionsComponent\n        (component\n          \"hds/form/super-select/after-options\"\n          content=@afterOptionsContent\n          resultCountMessage=this.resultCountMessage\n          showNoSelectedMessage=this._showNoSelectedMessage\n          showOnlySelected=this._showOnlySelected\n          showSelected=this.showSelected\n          showAll=this.showAll\n          clearSelected=this.clearSelected\n          selectedCount=this.selectedCount\n        )\n      )\n    }}\n    @ariaDescribedBy={{@ariaDescribedBy}}\n    @ariaInvalid={{@ariaInvalid}}\n    @ariaLabel={{@ariaLabel}}\n    @ariaLabelledBy={{@ariaLabelledBy}}\n    @beforeOptionsComponent={{@beforeOptionsComponent}}\n    @calculatePosition={{if @verticalPosition undefined this.calculatePosition}}\n    @closeOnSelect={{false}}\n    @disabled={{@disabled}}\n    @dropdownClass={{@dropdownClass}}\n    @extra={{@extra}}\n    @groupComponent={{component \"hds/form/super-select/option-group\"}}\n    @horizontalPosition={{@horizontalPosition}}\n    @initiallyOpened={{@initiallyOpened}}\n    @labelText={{@labelText}}\n    @loadingMessage={{@loadingMessage}}\n    @matcher={{@matcher}}\n    @matchTriggerWidth={{if @dropdownMaxWidth false @matchTriggerWidth}}\n    @noMatchesMessage={{@noMatchesMessage}}\n    @onBlur={{@onBlur}}\n    @onChange={{@onChange}}\n    @onClose={{@onClose}}\n    @onFocus={{@onFocus}}\n    @onInput={{@onInput}}\n    @onKeydown={{@onKeydown}}\n    @onOpen={{@onOpen}}\n    @options={{@options}}\n    @optionsComponent={{@optionsComponent}}\n    @placeholder={{@placeholder}}\n    @placeholderComponent={{@placeholderComponent}}\n    @preventScroll={{@preventScroll}}\n    @registerAPI={{this.setPowerSelectAPI}}\n    @renderInPlace={{true}}\n    @resultCountMessage={{@resultCountMessage}}\n    @scrollTo={{@scrollTo}}\n    @search={{@search}}\n    @searchEnabled={{@searchEnabled}}\n    @searchField={{@searchField}}\n    @searchMessage={{@searchMessage}}\n    @searchPlaceholder={{this.searchPlaceholder}}\n    @selected={{@selected}}\n    @selectedItemComponent={{@selectedItemComponent}}\n    @tabindex={{@tabindex}}\n    @triggerClass={{@triggerClass}}\n    @triggerComponent={{@triggerComponent}}\n    @triggerId={{@triggerId}}\n    @triggerRole={{@triggerRole}}\n    @typeAheadOptionMatcher={{@typeAheadOptionMatcher}}\n    @verticalPosition={{@verticalPosition}}\n    ...attributes\n    as |option select|\n  >\n    {{! even if technically what is yielded here are _a list_ of options, we\'ve decided to keep the `option` name for consistency with the existing `PowerSelect` API }}\n    {{yield option select}}\n  </PowerSelectMultiple>\n</div>");

var _class, _descriptor, _descriptor2, _descriptor3;
const DEFAULT_HORIZONTAL_POSITION = HdsFormSuperSelectHorizontalPositionValues.Left;
const HORIZONTAL_POSITION_MAPPING = HdsFormSuperSelectHorizontalPositionToPlacementValues;
let HdsFormSuperSelectMultipleBase = (_class = class HdsFormSuperSelectMultipleBase extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "_powerSelectAPI", _descriptor, this);
    _initializerDefineProperty(this, "_showOnlySelected", _descriptor2, this);
    _initializerDefineProperty(this, "_showNoSelectedMessage", _descriptor3, this);
  }
  get horizontalPosition() {
    const {
      horizontalPosition = DEFAULT_HORIZONTAL_POSITION
    } = this.args;
    return horizontalPosition;
  }
  get selectedCount() {
    return this._powerSelectAPI?.selected?.length || '0';
  }
  get optionsCount() {
    return this._powerSelectAPI?.resultsCount.toString() || '0';
  }
  get resultCountMessage() {
    return this.args.resultCountMessage || `${this.selectedCount} selected of ${this.optionsCount} total`;
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
    this._powerSelectAPI = powerSelectAPI;
  }
  showSelected() {
    this._showNoSelectedMessage = this.selectedCount === '0';
    this._showOnlySelected = true;
  }
  showAll() {
    this._showNoSelectedMessage = false;
    this._showOnlySelected = false;
  }
  clearSelected() {
    this._powerSelectAPI?.actions.select(null);
    // show all options after clearing all selection
    this._showNoSelectedMessage = false;
    this._showOnlySelected = false;
  }

  /**
   * Determine if `@afterOptionsComponent` gets displayed
   * @param showAfterOptions
   * @type {boolean}
   * @default true
   */
  get showAfterOptions() {
    return this.args.showAfterOptions ?? true;
  }

  // NOTE: The searchPlaceholder doesn't currently work for the multiple select
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
    const classes = ['hds-form-super-select', 'hds-form-super-select-multiple'];

    // add a class based on the @matchTriggerWidth argument or whether dropdownMaxWidth is set
    if (this.args.matchTriggerWidth === false || this.args.dropdownMaxWidth) {
      classes.push('hds-form-super-select--dropdown-content-auto-width');
    }

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-super-select--is-invalid`);
    }

    // add a class based on the showOnlySelected
    if (this._showOnlySelected) {
      classes.push(`hds-form-super-select--show-only-selected`);
    }
    return classes.join(' ');
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "_powerSelectAPI", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_showOnlySelected", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_showNoSelectedMessage", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "calculatePosition", [action], Object.getOwnPropertyDescriptor(_class.prototype, "calculatePosition"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setPowerSelectAPI", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setPowerSelectAPI"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showSelected", [action], Object.getOwnPropertyDescriptor(_class.prototype, "showSelected"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showAll", [action], Object.getOwnPropertyDescriptor(_class.prototype, "showAll"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "clearSelected", [action], Object.getOwnPropertyDescriptor(_class.prototype, "clearSelected"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsFormSuperSelectMultipleBase);

export { DEFAULT_HORIZONTAL_POSITION, HORIZONTAL_POSITION_MAPPING, HdsFormSuperSelectMultipleBase as default };
//# sourceMappingURL=base.js.map
