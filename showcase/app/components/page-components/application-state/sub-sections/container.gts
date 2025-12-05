/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCardLevelValues } from '@hashicorp/design-system-components/components/hds/card/types';
import {
  HdsCardContainer,
  HdsTable,
} from '@hashicorp/design-system-components/components';
import CodeFragmentWithGenericContent from '../code-fragments/with-generic-content';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface SubSectionContainerSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const SubSectionContainer: TemplateOnlyComponent<SubSectionContainerSignature> =
  <template>
    <ShwTextH2>In a container</ShwTextH2>

    <button
      type="button"
      class="shw-component-application-state-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <ShwFlex @direction="column" @gap="4rem" as |SF|>
      <SF.Item @label="In a card">
        <HdsCardContainer
          @level={{HdsCardLevelValues.Mid}}
          @hasBorder={{true}}
          {{style padding="40px"}}
        >
          <CodeFragmentWithGenericContent />
        </HdsCardContainer>
      </SF.Item>
      <SF.Item @label="In a table">
        <HdsTable @caption="a custom table with no model defined">
          <:head as |H|>
            <H.Tr>
              <H.Th>Lorem</H.Th>
              <H.Th>Ipsum</H.Th>
              <H.Th>Dolor</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td colspan="3" {{style padding="40px"}}>
                <CodeFragmentWithGenericContent />
              </B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
    </ShwFlex>
  </template>;

export default SubSectionContainer;
