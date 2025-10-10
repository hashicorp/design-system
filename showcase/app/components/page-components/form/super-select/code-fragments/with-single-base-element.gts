/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { fn } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';

import CodeFragmentWithOptionsGenericContent from 'showcase/components/page-components/form/super-select/code-fragments/with-options-generic-content';

import { HdsFormSuperSelectSingleBase } from '@hashicorp/design-system-components/components';

import type { HdsFormSuperSelectSingleBaseSignature } from '@hashicorp/design-system-components/components/hds/form/super-select/single/base';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

const PLACES_OPTIONS = [
  'Oregon (us-west-2)',
  'N. Virginia (us-east-1)',
  'ALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenString',
  'Ireland (eu-west-1)',
  'London(eu-west-2)',
  'Frankfurt (eu-central-1)',
];

export interface CodeFragmentWithSingleBaseElementSignature {
  Args: {
    options?: 'basic' | 'places';
    isSelected?: boolean;
    hasBeforeOptionsComponent?: boolean;
    hasAfterOptionsComponent?: boolean;
    hasResultCountMessage?: boolean;
    placeholder?: HdsFormSuperSelectSingleBaseSignature['Args']['placeholder'];
    disabled?: HdsFormSuperSelectSingleBaseSignature['Args']['disabled'];
    isInvalid?: HdsFormSuperSelectSingleBaseSignature['Args']['isInvalid'];
    matchTriggerWidth?: HdsFormSuperSelectSingleBaseSignature['Args']['matchTriggerWidth'];
    initiallyOpened?: HdsFormSuperSelectSingleBaseSignature['Args']['initiallyOpened'];
    verticalPosition?: HdsFormSuperSelectSingleBaseSignature['Args']['verticalPosition'];
    horizontalPosition?: HdsFormSuperSelectSingleBaseSignature['Args']['horizontalPosition'];
    searchEnabled?: HdsFormSuperSelectSingleBaseSignature['Args']['searchEnabled'];
    dropdownMaxWidth?: HdsFormSuperSelectSingleBaseSignature['Args']['dropdownMaxWidth'];
    showAfterOptions?: HdsFormSuperSelectSingleBaseSignature['Args']['showAfterOptions'];
    afterOptionsContent?: HdsFormSuperSelectSingleBaseSignature['Args']['afterOptionsContent'];
  };
  Element: HdsFormSuperSelectSingleBaseSignature['Element'];
}

export default class CodeFragmentWithSingleBaseElement extends Component<CodeFragmentWithSingleBaseElementSignature> {
  @tracked selectedOption;

  options = OPTIONS;

  constructor(
    owner: Owner,
    args: CodeFragmentWithSingleBaseElementSignature['Args'],
  ) {
    super(owner, args);
    if (args.isSelected) {
      this.selectedOption =
        args.options === 'places' ? PLACES_OPTIONS[0] : OPTIONS[0];
    }
    if (args.options === 'places') {
      this.options = PLACES_OPTIONS;
    }
  }

  get resultCountMessage() {
    return `Custom result count: ${this.options.length} options`;
  }

  <template>
    <HdsFormSuperSelectSingleBase
      @onChange={{fn (mut this.selectedOption)}}
      @options={{this.options}}
      @selected={{this.selectedOption}}
      @beforeOptionsComponent={{if
        @hasBeforeOptionsComponent
        CodeFragmentWithOptionsGenericContent
      }}
      @afterOptionsComponent={{if
        @hasAfterOptionsComponent
        CodeFragmentWithOptionsGenericContent
      }}
      @placeholder={{@placeholder}}
      @disabled={{@disabled}}
      @isInvalid={{@isInvalid}}
      @matchTriggerWidth={{@matchTriggerWidth}}
      @initiallyOpened={{@initiallyOpened}}
      @verticalPosition={{@verticalPosition}}
      @horizontalPosition={{@horizontalPosition}}
      @searchEnabled={{@searchEnabled}}
      @dropdownMaxWidth={{@dropdownMaxWidth}}
      @showAfterOptions={{@showAfterOptions}}
      @afterOptionsContent={{@afterOptionsContent}}
      @resultCountMessage={{if @hasResultCountMessage this.resultCountMessage}}
      @ariaLabel="Label"
      ...attributes
      as |option|
    >
      {{option}}
    </HdsFormSuperSelectSingleBase>
  </template>
}
