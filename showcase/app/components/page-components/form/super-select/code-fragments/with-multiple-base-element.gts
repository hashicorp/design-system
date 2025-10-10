/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { fn } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';

import CodeFragmentWithOptionsGenericContent from 'showcase/components/page-components/form/super-select/code-fragments/with-options-generic-content';

import { HdsFormSuperSelectMultipleBase } from '@hashicorp/design-system-components/components';

import type { HdsFormSuperSelectMultipleBaseSignature } from '@hashicorp/design-system-components/components/hds/form/super-select/multiple/base';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

const PLACES_OPTIONS = [
  'Oregon (us-west-2)',
  'N. Virginia (us-east-1)',
  'ALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenString',
  'Ireland (eu-west-1)',
  'London(eu-west-2)',
  'Frankfurt (eu-central-1)',
];

export interface CodeFragmentWithMultipleBaseElementSignature {
  Args: {
    options?: 'basic' | 'places';
    isSelected?: boolean;
    hasBeforeOptionsComponent?: boolean;
    hasAfterOptionsComponent?: boolean;
    hasResultCountMessage?: boolean;
    placeholder?: HdsFormSuperSelectMultipleBaseSignature['Args']['placeholder'];
    disabled?: HdsFormSuperSelectMultipleBaseSignature['Args']['disabled'];
    isInvalid?: HdsFormSuperSelectMultipleBaseSignature['Args']['isInvalid'];
    matchTriggerWidth?: HdsFormSuperSelectMultipleBaseSignature['Args']['matchTriggerWidth'];
    initiallyOpened?: HdsFormSuperSelectMultipleBaseSignature['Args']['initiallyOpened'];
    verticalPosition?: HdsFormSuperSelectMultipleBaseSignature['Args']['verticalPosition'];
    horizontalPosition?: HdsFormSuperSelectMultipleBaseSignature['Args']['horizontalPosition'];
    searchEnabled?: HdsFormSuperSelectMultipleBaseSignature['Args']['searchEnabled'];
    dropdownMaxWidth?: HdsFormSuperSelectMultipleBaseSignature['Args']['dropdownMaxWidth'];
    showAfterOptions?: HdsFormSuperSelectMultipleBaseSignature['Args']['showAfterOptions'];
    afterOptionsContent?: HdsFormSuperSelectMultipleBaseSignature['Args']['afterOptionsContent'];
  };
  Element: HdsFormSuperSelectMultipleBaseSignature['Element'];
}

export default class CodeFragmentWithMultipleBaseElement extends Component<CodeFragmentWithMultipleBaseElementSignature> {
  @tracked selectedOptions;

  options = OPTIONS;

  constructor(
    owner: Owner,
    args: CodeFragmentWithMultipleBaseElementSignature['Args'],
  ) {
    super(owner, args);
    if (args.isSelected) {
      this.selectedOptions =
        args.options === 'places'
          ? [PLACES_OPTIONS[0], PLACES_OPTIONS[1]]
          : [OPTIONS[0], OPTIONS[1]];
    }
    if (args.options === 'places') {
      this.options = PLACES_OPTIONS;
    }
  }

  get resultCountMessage() {
    return `Custom result count: ${this.options.length} options`;
  }

  <template>
    <HdsFormSuperSelectMultipleBase
      @onChange={{fn (mut this.selectedOptions)}}
      @options={{this.options}}
      @selected={{this.selectedOptions}}
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
    </HdsFormSuperSelectMultipleBase>
  </template>
}
