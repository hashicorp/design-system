/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash, concat } from '@ember/helper';

import type { Select as PowerSelect } from 'ember-power-select/components/power-select';

import { ID_PREFIX } from '../../label/index.gts';
import HdsFormField from '../../field/index.gts';
import HdsFormSuperSelectMultipleBase from './base.gts';
import HdsYield from '../../../yield/index.gts';

import type { HdsFormFieldSignature } from '../../field/index.gts';
import type { HdsFormSuperSelectMultipleBaseSignature } from './base.gts';

export interface HdsFormSuperSelectMultipleFieldSignature {
  Args: HdsFormSuperSelectMultipleBaseSignature['Args'] &
    HdsFormFieldSignature['Args'];
  Blocks: {
    default: [
      {
        Label?: HdsFormFieldSignature['Blocks']['default'][0]['Label'];
        HelperText?: HdsFormFieldSignature['Blocks']['default'][0]['HelperText'];
        Error?: HdsFormFieldSignature['Blocks']['default'][0]['Error'];
        Options?: typeof HdsYield;
        options?: unknown;
        select?: PowerSelect;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

export default class HdsFormSuperSelectMultipleField extends Component<HdsFormSuperSelectMultipleFieldSignature> {
  get idPrefix(): string {
    return ID_PREFIX;
  }

  <template>
    <HdsFormField
      @layout="vertical"
      @extraAriaDescribedBy={{@extraAriaDescribedBy}}
      @isRequired={{@isRequired}}
      @isOptional={{@isOptional}}
      @id={{@id}}
      as |F|
    >
      {{! Notice: the order of the elements is not relevant here, because is controlled at "HdsFormField" component level }}
      {{yield (hash Label=F.Label HelperText=F.HelperText Error=F.Error)}}
      <F.Control>
        {{! Important: if an argument is added in base.hbs, it must also be added/processed here }}
        <HdsFormSuperSelectMultipleBase
          @afterOptionsComponent={{@afterOptionsComponent}}
          @afterOptionsContent={{@afterOptionsContent}}
          @ariaDescribedBy={{F.ariaDescribedBy}}
          @ariaInvalid={{@ariaInvalid}}
          @ariaLabel={{@ariaLabel}}
          @ariaLabelledBy={{(concat this.idPrefix F.id)}}
          @beforeOptionsComponent={{@beforeOptionsComponent}}
          @disabled={{@disabled}}
          @dropdownClass={{@dropdownClass}}
          @dropdownMaxWidth={{@dropdownMaxWidth}}
          @extra={{@extra}}
          @groupComponent={{@groupComponent}}
          @horizontalPosition={{@horizontalPosition}}
          @initiallyOpened={{@initiallyOpened}}
          @labelText={{@labelText}}
          @loadingMessage={{@loadingMessage}}
          @matcher={{@matcher}}
          @matchTriggerWidth={{@matchTriggerWidth}}
          @noMatchesMessage={{@noMatchesMessage}}
          @onBlur={{@onBlur}}
          @onChange={{@onChange}}
          @onClose={{@onClose}}
          @onFocus={{@onFocus}}
          @onInput={{@onInput}}
          @onKeydown={{@onKeydown}}
          @onOpen={{@onOpen}}
          @options={{@options}}
          @optionsComponent={{@optionsComponent}}
          @placeholder={{@placeholder}}
          @placeholderComponent={{@placeholderComponent}}
          @preventScroll={{@preventScroll}}
          @registerAPI={{@registerAPI}}
          @renderInPlace={{true}}
          @resultCountMessage={{@resultCountMessage}}
          @scrollTo={{@scrollTo}}
          @search={{@search}}
          @searchEnabled={{@searchEnabled}}
          @searchField={{@searchField}}
          @searchFieldPosition="before-options"
          @searchMessage={{@searchMessage}}
          @searchPlaceholder={{@searchPlaceholder}}
          @selected={{@selected}}
          @selectedItemComponent={{@selectedItemComponent}}
          @showAfterOptions={{@showAfterOptions}}
          @tabindex={{@tabindex}}
          @triggerClass={{@triggerClass}}
          @triggerComponent={{@triggerComponent}}
          @triggerId={{F.id}}
          @triggerRole={{@triggerRole}}
          @typeAheadOptionMatcher={{@typeAheadOptionMatcher}}
          @verticalPosition={{@verticalPosition}}
          @isInvalid={{@isInvalid}}
          ...attributes
          as |options select|
        >
          {{yield (hash options=options select=select Options=HdsYield)}}
        </HdsFormSuperSelectMultipleBase>
      </F.Control>
    </HdsFormField>
  </template>
}
