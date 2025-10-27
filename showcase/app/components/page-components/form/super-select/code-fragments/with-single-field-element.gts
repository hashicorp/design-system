/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { fn, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import { eq } from 'ember-truth-helpers';
import type Owner from '@ember/owner';

import CodeFragmentWithSelectedComponent from 'showcase/components/page-components/form/super-select/code-fragments/with-selected-component';

import { HdsFormSuperSelectSingleField } from '@hashicorp/design-system-components/components';

import type { HdsFormSuperSelectSingleFieldSignature } from '@hashicorp/design-system-components/components/hds/form/super-select/single/field';

interface GroupedOption {
  groupName: string;
  options: (string | GroupedOption)[];
}

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

const CLUSTER_SIZE_OPTIONS = [
  {
    size: 'Extra Small',
    description: '2 vCPU | 1 GiB RAM',
    price: '$0.02',
  },
  {
    size: 'Small',
    description: '2 vCPU | 2 GiB RAM',
    price: '$0.04',
  },
  {
    size: 'Medium',
    description: '4 vCPU | 4 GiB RAM',
    price: '$0.08',
  },
  { size: 'Large', description: '8 vCPU | 8 GiB RAM', price: '$0.16' },
  {
    size: 'Extra Large',
    description: '16 vCPU | 16 GiB RAM',
    price: '$0.32',
  },
];

const GROUPED_OPTIONS = [
  { groupName: 'Group', options: ['Option 1', 'Option 2'] },
  { groupName: 'Group', options: ['Option 3', 'Option 4'] },
  {
    groupName: 'Group',
    options: [
      { groupName: 'Subgroup', options: ['Option 5', 'Option 6'] },
      { groupName: 'Subgroup', options: ['Option 7', 'Option 8'] },
    ],
  },
  {
    groupName: 'Group',
    options: [
      { groupName: 'Subgroup', options: ['Option 10', 'Option 11'] },
      { groupName: 'Subgroup', options: ['Option 12', 'Option 13'] },
    ],
  },
];

export interface CodeFragmentWithSingleFieldElementSignature {
  Args: {
    options?: 'basic' | 'cluster-size' | 'grouped';
    isSelected?: boolean;
    hasSelectedItemComponent?: boolean;
    hasRichContent?: boolean;
    isInvalid?: HdsFormSuperSelectSingleFieldSignature['Args']['isInvalid'];
    isRequired?: HdsFormSuperSelectSingleFieldSignature['Args']['isRequired'];
    isOptional?: HdsFormSuperSelectSingleFieldSignature['Args']['isOptional'];
    disabled?: HdsFormSuperSelectSingleFieldSignature['Args']['disabled'];
    initiallyOpened?: HdsFormSuperSelectSingleFieldSignature['Args']['initiallyOpened'];
    verticalPosition?: HdsFormSuperSelectSingleFieldSignature['Args']['verticalPosition'];
    horizontalPosition?: HdsFormSuperSelectSingleFieldSignature['Args']['horizontalPosition'];
  };
  Blocks: {
    default: [
      {
        Label?: HdsFormSuperSelectSingleFieldSignature['Blocks']['default'][0]['Label'];
        HelperText?: HdsFormSuperSelectSingleFieldSignature['Blocks']['default'][0]['HelperText'];
        Error?: HdsFormSuperSelectSingleFieldSignature['Blocks']['default'][0]['Error'];
        Options?: HdsFormSuperSelectSingleFieldSignature['Blocks']['default'][0]['Options'];
        options?: unknown;
      },
    ];
  };
}

export default class CodeFragmentWithSingleFieldElement extends Component<CodeFragmentWithSingleFieldElementSignature> {
  @tracked selectedOption;

  constructor(
    owner: Owner,
    args: CodeFragmentWithSingleFieldElementSignature['Args'],
  ) {
    super(owner, args);
    if (args.isSelected) {
      if (args.options === 'grouped') {
        this.selectedOption = (this.options as GroupedOption[])[0]
          ?.options[0] as string | GroupedOption;
      } else {
        this.selectedOption = this.options[0];
      }
    }
  }

  get options() {
    const { options } = this.args;

    if (options === 'cluster-size') {
      return CLUSTER_SIZE_OPTIONS;
    } else if (options === 'grouped') {
      return GROUPED_OPTIONS;
    } else {
      return OPTIONS;
    }
  }

  <template>
    <HdsFormSuperSelectSingleField
      @onChange={{fn (mut this.selectedOption)}}
      @options={{this.options}}
      @selected={{this.selectedOption}}
      @selectedItemComponent={{if
        @hasSelectedItemComponent
        CodeFragmentWithSelectedComponent
      }}
      @isInvalid={{@isInvalid}}
      @isRequired={{@isRequired}}
      @isOptional={{@isOptional}}
      @disabled={{@disabled}}
      @initiallyOpened={{@initiallyOpened}}
      @verticalPosition={{@verticalPosition}}
      @horizontalPosition={{@horizontalPosition}}
      as |F|
    >
      {{#if (eq @options "grouped")}}
        {{yield
          (hash
            Label=F.Label
            HelperText=F.HelperText
            Error=F.Error
            Options=F.Options
          )
        }}
      {{else}}
        {{yield
          (hash
            Label=F.Label
            HelperText=F.HelperText
            Error=F.Error
            Options=F.Options
            options=F.options
          )
        }}
      {{/if}}
      {{#unless @hasRichContent}}
        {{! @glint-expect-error - https://hashicorp.atlassian.net/browse/HDS-5090 }}
        {{F.options}}
      {{/unless}}
    </HdsFormSuperSelectSingleField>
  </template>
}
