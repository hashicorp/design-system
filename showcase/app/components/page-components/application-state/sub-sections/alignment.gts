/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { on } from '@ember/modifier';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import { ALIGNS } from '@hashicorp/design-system-components/components/hds/application-state/index';

import CodeFragmentWithActionVariants from '../code-fragments/with-action-variants';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface SubSectionAlignmentSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const SubSectionAlignment: TemplateOnlyComponent<SubSectionAlignmentSignature> =
  <template>
    <ShwTextH2>Alignment</ShwTextH2>

    <button
      type="button"
      class="shw-component-application-state-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <ShwFlex @direction="row" @gap="4rem" as |SF|>
      {{#each ALIGNS as |align|}}
        <SF.Item
          @label="{{capitalize align}} aligned {{if
            (eq align 'left')
            ' (default)'
          }}"
        >
          <CodeFragmentWithActionVariants
            @align={{align}}
            @hasStandaloneLink={{true}}
          />
        </SF.Item>
      {{/each}}
      {{#each ALIGNS as |align|}}
        <SF.Item @label="Two actions / {{align}} aligned">
          <CodeFragmentWithActionVariants
            @align={{align}}
            @hasPrimaryAction={{true}}
            @hasStandaloneLink={{true}}
          />
        </SF.Item>
      {{/each}}
      {{#each ALIGNS as |align|}}
        <SF.Item @label="Three actions / {{align}} aligned">
          <CodeFragmentWithActionVariants
            @align={{align}}
            @hasPrimaryAction={{true}}
            @hasSecondaryAction={{true}}
            @hasStandaloneLink={{true}}
          />
        </SF.Item>
      {{/each}}
      {{#each ALIGNS as |align|}}
        <SF.Item @label="Two actions (1 dropdown) / {{align}} aligned">
          <CodeFragmentWithActionVariants
            @align={{align}}
            @hasDropdown={{true}}
            @hasPrimaryAction={{true}}
          />
        </SF.Item>
      {{/each}}
      {{#each ALIGNS as |align|}}
        <SF.Item @label="Three actions (1 dropdown) / {{align}} aligned">
          <CodeFragmentWithActionVariants
            @align={{align}}
            @hasDropdown={{true}}
            @hasPrimaryAction={{true}}
            @hasStandaloneLink={{true}}
          />
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <ShwDivider />
  </template>;

export default SubSectionAlignment;
