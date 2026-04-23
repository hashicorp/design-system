/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsFormTextInputField,
  HdsStepperList,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithDefaultImplementationComponents from 'showcase/components/page-components/stepper/list/code-fragments/with-default-implementation';

const SubSectionExampleImplementations: TemplateOnlyComponent = <template>
  <ShwTextH2>Example implementations</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Default">
      <CodeFragmentWithDefaultImplementationComponents @currentStep={{1}} />
    </SG.Item>
    <SG.Item @label="Processing state">
      <CodeFragmentWithDefaultImplementationComponents
        @currentStep={{1}}
        @isProcessing={{true}}
      />
    </SG.Item>
    <SG.Item>
      <HdsStepperList @ariaLabel="Basic usage" as |S|>
        <S.Step>
          <:content>
            <HdsFormTextInputField
              @value="1234-567-890-1234"
              name="demo-cris"
              as |F|
            >
              <F.Label>Contract activation code</F.Label>
              <F.HelperText>The contract activation code should be copied and
                pasted from the contract activation email.</F.HelperText>
            </HdsFormTextInputField>
          </:content>
        </S.Step>
        <S.Step>
          <:title>Review flex contract details</:title>
          <:description>Confirm the contract details below:</:description>
        </S.Step>
        <S.Step>
          <:title>Three</:title>
          <:description>Description</:description>
        </S.Step>
      </HdsStepperList>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionExampleImplementations;
