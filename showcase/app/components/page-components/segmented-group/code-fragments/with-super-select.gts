/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { concat } from '@ember/helper';
import { eq, or } from 'ember-truth-helpers';

import { HdsSegmentedGroup } from '@hashicorp/design-system-components/components';

const SUPER_SELECT_OPTIONS = [
  'Boundary',
  'Consul',
  'Packer',
  'Terraform',
  'Vault',
  'Waypoint',
];

export interface CodeFragmentWithSuperSelectSignature {
  Args: {
    type?: 'single' | 'multiple';
    position?: 'leading' | 'middle' | 'trailing';
    width?: string;
  };
}

export default class CodeFragmentWithSuperSelect extends Component<CodeFragmentWithSuperSelectSignature> {
  @tracked selectedValue: string | undefined = undefined;
  @tracked selectedValues: string[] = [];

  setSelectedValue = (value: string): void => {
    this.selectedValue = value;
  };

  setSelectedValues = (values: string[]): void => {
    this.selectedValues = values;
  };

  <template>
    <HdsSegmentedGroup as |SGR|>
      {{#if (or (eq @position "trailing") (eq @position "middle"))}}
        <SGR.TextInput
          aria-label={{concat
            "segmented-super-select-"
            (if (eq @type "multiple") "multiple" "single")
            "-"
            @position
          }}
        />
      {{/if}}

      {{#if (eq @type "multiple")}}
        <SGR.SuperSelectMultiple
          @options={{SUPER_SELECT_OPTIONS}}
          @selected={{this.selectedValues}}
          @onChange={{this.setSelectedValues}}
          @placeholder="Select services"
          @width={{@width}}
          @ariaLabel={{concat
            "segmented-super-select-multiple-"
            @position
            "-control"
          }}
          as |option|
        >
          {{option}}
        </SGR.SuperSelectMultiple>
      {{else}}
        <SGR.SuperSelect
          @options={{SUPER_SELECT_OPTIONS}}
          @selected={{this.selectedValue}}
          @onChange={{this.setSelectedValue}}
          @placeholder="Select service"
          @width="300px"
          @ariaLabel={{concat
            "segmented-super-select-single-"
            @position
            "-control"
          }}
          as |option|
        >
          {{option}}
        </SGR.SuperSelect>
      {{/if}}

      {{#if (or (eq @position "leading") (eq @position "middle"))}}
        <SGR.Button @color="secondary" @text="Apply" />
      {{/if}}
    </HdsSegmentedGroup>
  </template>
}
