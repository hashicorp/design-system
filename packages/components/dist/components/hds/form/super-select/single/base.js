import { _ as _applyDecoratedDescriptor } from '../../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import PowerSelectComponent from 'ember-power-select/components/power-select';
import anchoredPositionModifier from '../../../../../modifiers/hds-anchored-position.js';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! Important: if an argument is added in base.hbs, it must also be added/processed in the Base component used in field.hbs }}\n<div class={{this.classNames}} {{style this.dropdownMaxWidthStyle}}>\n  <PowerSelect\n    @afterOptionsComponent={{if\n      this.showAfterOptions\n      (or\n        @afterOptionsComponent\n        (component\n          \"hds/form/super-select/after-options\" content=@afterOptionsContent resultCountMessage=this.resultCountMessage\n        )\n      )\n    }}\n    @ariaDescribedBy={{@ariaDescribedBy}}\n    @ariaInvalid={{@ariaInvalid}}\n    @ariaLabel={{@ariaLabel}}\n    @ariaLabelledBy={{@ariaLabelledBy}}\n    @beforeOptionsComponent={{@beforeOptionsComponent}}\n    @calculatePosition={{if @verticalPosition undefined this.calculatePosition}}\n    @closeOnSelect={{@closeOnSelect}}\n    @disabled={{@disabled}}\n    @dropdownClass={{@dropdownClass}}\n    @extra={{@extra}}\n    @groupComponent={{component \"hds/form/super-select/option-group\"}}\n    @horizontalPosition={{@horizontalPosition}}\n    @initiallyOpened={{@initiallyOpened}}\n    @labelText={{@labelText}}\n    @loadingMessage={{@loadingMessage}}\n    @matcher={{@matcher}}\n    @matchTriggerWidth={{if @dropdownMaxWidth false @matchTriggerWidth}}\n    @noMatchesMessage={{@noMatchesMessage}}\n    @onBlur={{@onBlur}}\n    @onChange={{@onChange}}\n    @onClose={{@onClose}}\n    @onFocus={{@onFocus}}\n    @onInput={{@onInput}}\n    @onKeydown={{@onKeydown}}\n    @onOpen={{@onOpen}}\n    @options={{@options}}\n    @optionsComponent={{@optionsComponent}}\n    @placeholder={{@placeholder}}\n    @placeholderComponent={{component \"hds/form/super-select/placeholder\"}}\n    @preventScroll={{@preventScroll}}\n    @registerAPI={{@registerAPI}}\n    @renderInPlace={{true}}\n    @resultCountMessage={{@resultCountMessage}}\n    @scrollTo={{@scrollTo}}\n    @search={{@search}}\n    @searchEnabled={{@searchEnabled}}\n    @searchField={{@searchField}}\n    @searchMessage={{@searchMessage}}\n    @searchPlaceholder={{this.searchPlaceholder}}\n    @selected={{@selected}}\n    @selectedItemComponent={{@selectedItemComponent}}\n    @tabindex={{@tabindex}}\n    @triggerClass={{@triggerClass}}\n    @triggerComponent={{@triggerComponent}}\n    @triggerId={{@triggerId}}\n    @triggerRole={{@triggerRole}}\n    @typeAheadMatcher={{@typeAheadMatcher}}\n    @verticalPosition={{@verticalPosition}}\n    ...attributes\n    as |option select|\n  >\n    <Hds::Text::Body>{{yield option select}}</Hds::Text::Body>\n  </PowerSelect>\n</div>");

var _class;
const DEFAULT_HORIZONTAL_POSITION = 'bottom-start';
const HORIZONTAL_POSITION_MAPPING = {
  left: 'bottom-start',
  center: 'bottom',
  right: 'bottom-end'
};
let HdsSuperSelectSingleBaseComponent = (_class = class HdsSuperSelectSingleBaseComponent extends PowerSelectComponent {
  calculatePosition(trigger, content) {
    // use `hds-anchored-position` to calculate and set position
    anchoredPositionModifier(content, [trigger], {
      placement: this.args.horizontalPosition ? HORIZONTAL_POSITION_MAPPING[this.args.horizontalPosition] : DEFAULT_HORIZONTAL_POSITION,
      offsetOptions: 4,
      enableCollisionDetection: true
    });
    // prevent PowerSelect from setting position
    return {};
  }

  /**
   * Determine if `@afterOptionsComponent` gets displayed
   * @param showAfterOptions
   * @type {boolean}
   * @default false
   */
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
    let classes = ['hds-form-super-select', 'hds-form-super-select-single'];

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
}, (_applyDecoratedDescriptor(_class.prototype, "calculatePosition", [action], Object.getOwnPropertyDescriptor(_class.prototype, "calculatePosition"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsSuperSelectSingleBaseComponent);

export { HdsSuperSelectSingleBaseComponent as default };
//# sourceMappingURL=base.js.map
