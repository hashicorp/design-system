/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import { HdsFormMaskedInputBase } from '@hashicorp/design-system-components/components';

import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';

import { INTERACTION_STATES } from 'showcase/utils/ComponentStates';

export interface MaskedInputStatesSignature {
  Args: {
    isMultiline?: boolean;
    hasCopyButton?: boolean;
  };
  Element: HTMLDivElement;
}

export default class MaskedInputStates extends Component<MaskedInputStatesSignature> {
  get mockStateSelector(): string {
    if (this.args.hasCopyButton) {
      return 'button';
    } else if (this.args.isMultiline) {
      return 'textarea';
    }
    return 'input';
  }

  <template>
    {{#let (array "base" "invalid" "readonly" "disabled") as |variants|}}
      {{#each variants as |variant|}}
        <ShwGrid @columns={{4}} as |SG|>
          {{#each INTERACTION_STATES as |state|}}
            <SG.Item
              @label="{{capitalize variant}} / {{capitalize state}}"
              mock-state-value={{state}}
              mock-state-selector={{this.mockStateSelector}}
            >
              <ShwFlex @direction="column" as |SF|>
                <SF.Item>
                  <HdsFormMaskedInputBase
                    disabled={{if (eq variant "disabled") "disabled"}}
                    readonly={{if (eq variant "readonly") "readonly"}}
                    @value="Lorem ipsum dolor"
                    @isInvalid={{if (eq variant "invalid") true}}
                    aria-label="{{variant}} - {{state}}"
                    @isMultiline={{@isMultiline}}
                    @hasCopyButton={{@hasCopyButton}}
                  />
                </SF.Item>
              </ShwFlex>
            </SG.Item>
          {{/each}}
        </ShwGrid>
      {{/each}}
    {{/let}}
  </template>
}
