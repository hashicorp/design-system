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

import { HdsFormSuperSelectMultipleField } from '@hashicorp/design-system-components/components';

import type { HdsFormSuperSelectMultipleFieldSignature } from '@hashicorp/design-system-components/components/hds/form/super-select/multiple/field';

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

export interface CodeFragmentWithMultipleFieldElementSignature {
  Args: {
    options?: 'basic' | 'cluster-size' | 'grouped';
    isSelected?: boolean;
    hasSelectedItemComponent?: boolean;
    hasRichContent?: boolean;
    isInvalid?: HdsFormSuperSelectMultipleFieldSignature['Args']['isInvalid'];
    isRequired?: HdsFormSuperSelectMultipleFieldSignature['Args']['isRequired'];
    isOptional?: HdsFormSuperSelectMultipleFieldSignature['Args']['isOptional'];
    disabled?: HdsFormSuperSelectMultipleFieldSignature['Args']['disabled'];
    initiallyOpened?: HdsFormSuperSelectMultipleFieldSignature['Args']['initiallyOpened'];
    verticalPosition?: HdsFormSuperSelectMultipleFieldSignature['Args']['verticalPosition'];
    horizontalPosition?: HdsFormSuperSelectMultipleFieldSignature['Args']['horizontalPosition'];
  };
  Blocks: {
    default: [
      {
        Label?: HdsFormSuperSelectMultipleFieldSignature['Blocks']['default'][0]['Label'];
        HelperText?: HdsFormSuperSelectMultipleFieldSignature['Blocks']['default'][0]['HelperText'];
        Error?: HdsFormSuperSelectMultipleFieldSignature['Blocks']['default'][0]['Error'];
        Options?: HdsFormSuperSelectMultipleFieldSignature['Blocks']['default'][0]['Options'];
        options?: unknown;
      },
    ];
  };
}

export default class CodeFragmentWithMultipleFieldElement extends Component<CodeFragmentWithMultipleFieldElementSignature> {
  @tracked selectedOptions;

  constructor(
    owner: Owner,
    args: CodeFragmentWithMultipleFieldElementSignature['Args'],
  ) {
    super(owner, args);
    if (args.isSelected) {
      if (args.options === 'grouped') {
        this.selectedOptions = [
          (this.options as GroupedOption[])[0]?.options[0] as
            | GroupedOption
            | string,
          (this.options as GroupedOption[])[1]?.options[0] as
            | GroupedOption
            | string,
        ];
      } else {
        this.selectedOptions = [this.options[0], this.options[1]];
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
    <HdsFormSuperSelectMultipleField
      @onChange={{fn (mut this.selectedOptions)}}
      @options={{this.options}}
      @selected={{this.selectedOptions}}
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
    </HdsFormSuperSelectMultipleField>
  </template>
}
