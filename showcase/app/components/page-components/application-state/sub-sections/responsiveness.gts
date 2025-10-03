/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { array, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier/modifiers/style';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';
import { ALIGNS } from '@hashicorp/design-system-components/components/hds/application-state/index';

import CodeFragmentWithErrorContent from '../code-fragments/with-error-content';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface SubSectionResponsivenessSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const SubSectionResponsiveness: TemplateOnlyComponent<SubSectionResponsivenessSignature> =
  <template>
    <ShwTextH2>Responsiveness</ShwTextH2>

    <button
      type="button"
      class="shw-component-application-state-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <ShwFlex @direction="column" @gap="4rem" as |SF|>
      {{#let
        (array
          (hash
            value="100%"
            label="Both media and content smaller than parent container"
          )
          (hash
            value="550px"
            label="Media larger and content smaller than parent container"
          )
          (hash
            value="320px"
            label="Both media and content larger than parent container"
          )
        )
        as |widths|
      }}
        {{#each widths as |width|}}
          {{#each ALIGNS as |align|}}
            <SF.Item @label="{{width.label}} / {{align}} aligned">
              <ShwOutliner {{style width=width.value}}>
                <CodeFragmentWithErrorContent
                  @align={{align}}
                  @actions={{array "primary" "secondary" "standaloneLink"}}
                  @hasErrorCode={{true}}
                  @icon="alert-circle"
                  @media="image"
                />
              </ShwOutliner>
            </SF.Item>
          {{/each}}
        {{/each}}
      {{/let}}
    </ShwFlex>

    <ShwDivider />
  </template>;

export default SubSectionResponsiveness;
