/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { concat } from '@ember/helper';
import HdsFormField from '../../field/index.gts';
import HdsFormSuperSelectMultipleBase from './base.gts';
import HdsYield from '../../../yield/index.gts';
import { ID_PREFIX } from '../../label/index.gts';

import type { ComponentLike } from '@glint/template';
import type { HdsFormErrorSignature } from '../../error/index.gts';
import type { HdsFormFieldSignature } from '../../field/index.gts';
import type { HdsFormHelperTextSignature } from '../../helper-text/index.gts';
import type { HdsFormLabelSignature } from '../../label/index.gts';
import type { HdsFormSuperSelectMultipleBaseSignature } from './base.gts';
import type { Select as PowerSelect } from 'ember-power-select/components/power-select';
import type { HdsYieldSignature } from '../../../yield/index.gts';

export interface HdsFormSuperSelectMultipleFieldSignature {
  Args: HdsFormSuperSelectMultipleBaseSignature['Args'] &
    HdsFormFieldSignature['Args'];
  Blocks: {
    default: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
        Options?: ComponentLike<HdsYieldSignature>;
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
      {{! Notice: the order of the elements is not relevant here, because is controlled at "Hds::Form::Field" component level }}
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
          {{yield
            (hash
              options=options
              select=select
              Options=(component HdsYield options=options select=select)
            )
          }}
        </HdsFormSuperSelectMultipleBase>
      </F.Control>
    </HdsFormField>
  </template>
}
