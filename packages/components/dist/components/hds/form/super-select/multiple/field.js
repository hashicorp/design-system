import PowerSelectComponent from 'ember-power-select/components/power-select';
import { ID_PREFIX } from '../../label/index.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Form::Field\n  @layout=\"vertical\"\n  @extraAriaDescribedBy={{@extraAriaDescribedBy}}\n  @isRequired={{@isRequired}}\n  @isOptional={{@isOptional}}\n  @id={{@id}}\n  as |F|\n>\n  {{! Notice: the order of the elements is not relevant here, because is controlled at \"Hds::Form::Field\" component level }}\n  {{yield (hash Label=F.Label isRequired=F.isRequired isOptional=F.isOptional)}}\n  {{yield (hash HelperText=F.HelperText Error=F.Error)}}\n  <F.Control>\n    {{! Important: if an argument is added in base.hbs, it must also be added/processed here }}\n    <Hds::Form::SuperSelect::Multiple::Base\n      @afterOptionsComponent={{@afterOptionsComponent}}\n      @afterOptionsContent={{@afterOptionsContent}}\n      @ariaDescribedBy={{F.ariaDescribedBy}}\n      @ariaInvalid={{@ariaInvalid}}\n      @ariaLabel={{@ariaLabel}}\n      @ariaLabelledBy={{(concat this.idPrefix F.id)}}\n      @beforeOptionsComponent={{@beforeOptionsComponent}}\n      @disabled={{@disabled}}\n      @dropdownClass={{@dropdownClass}}\n      @dropdownMaxWidth={{@dropdownMaxWidth}}\n      @extra={{@extra}}\n      @groupComponent={{@groupComponent}}\n      @horizontalPosition={{@horizontalPosition}}\n      @initiallyOpened={{@initiallyOpened}}\n      @labelText={{@labelText}}\n      @loadingMessage={{@loadingMessage}}\n      @matcher={{@matcher}}\n      @matchTriggerWidth={{@matchTriggerWidth}}\n      @noMatchesMessage={{@noMatchesMessage}}\n      @onBlur={{@onBlur}}\n      @onChange={{@onChange}}\n      @onClose={{@onClose}}\n      @onFocus={{@onFocus}}\n      @onInput={{@onInput}}\n      @onKeydown={{@onKeydown}}\n      @onOpen={{@onOpen}}\n      @options={{@options}}\n      @optionsComponent={{@optionsComponent}}\n      @placeholder={{@placeholder}}\n      @placeholderComponent={{@placeholderComponent}}\n      @preventScroll={{@preventScroll}}\n      @registerAPI={{@registerAPI}}\n      @renderInPlace={{true}}\n      @resultCountMessage={{@resultCountMessage}}\n      @scrollTo={{@scrollTo}}\n      @search={{@search}}\n      @searchEnabled={{@searchEnabled}}\n      @searchField={{@searchField}}\n      @searchMessage={{@searchMessage}}\n      @searchPlaceholder={{@searchPlaceholder}}\n      @selected={{@selected}}\n      @selectedItemComponent={{@selectedItemComponent}}\n      @showAfterOptions={{@showAfterOptions}}\n      @tabindex={{@tabindex}}\n      @triggerClass={{@triggerClass}}\n      @triggerComponent={{@triggerComponent}}\n      @triggerId={{F.id}}\n      @triggerRole={{@triggerRole}}\n      @typeAheadMatcher={{@typeAheadMatcher}}\n      @verticalPosition={{@verticalPosition}}\n      @isInvalid={{@isInvalid}}\n      ...attributes\n      as |options select|\n    >\n      {{yield (hash options=options select=select Options=(component \"hds/yield\" options=options select=select))}}\n    </Hds::Form::SuperSelect::Multiple::Base>\n  </F.Control>\n</Hds::Form::Field>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsSuperSelectMultipleFieldComponent extends PowerSelectComponent {
  get idPrefix() {
    return ID_PREFIX;
  }
}
setComponentTemplate(TEMPLATE, HdsSuperSelectMultipleFieldComponent);

export { HdsSuperSelectMultipleFieldComponent as default };
//# sourceMappingURL=field.js.map
