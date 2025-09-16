/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import style from 'ember-style-modifier/modifiers/style';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCardLevelValues } from '@hashicorp/design-system-components/components/hds/card/types';
import {
  HdsCardContainer,
  HdsTable,
} from '@hashicorp/design-system-components/components';
import CodeFragmentWithContainer from '../code-fragments/with-container';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface SubSectionContainerSignature {
  Args: {
    showHighlight: boolean;
  };
}

const SubSectionContainer: TemplateOnlyComponent<SubSectionContainerSignature> =
  <template>
    <ShwTextH2>In a container</ShwTextH2>

    <ShwFlex @direction="column" @gap="4rem" as |SF|>
      <SF.Item @label="In a card">
        <HdsCardContainer
          @level={{HdsCardLevelValues.Mid}}
          @hasBorder={{true}}
          {{style padding="40px"}}
        >
          <CodeFragmentWithContainer />
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
                <CodeFragmentWithContainer />
              </B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
    </ShwFlex>
  </template>;

export default SubSectionContainer;
