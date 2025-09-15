/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import CodeFragmentWithContextualComponents from 'showcase/components/page-components/stepper/nav/code-fragments/with-contextual-components';
import CodeFragmentWithStepsArray from 'showcase/components/page-components/stepper/nav/code-fragments/with-steps-array';
import CodeFragmentWithVariableSteps from 'showcase/components/page-components/stepper/nav/code-fragments/with-variable-steps';

const SubSectionExamples: TemplateOnlyComponent = <template>
  <ShwTextH2>Example implementations</ShwTextH2>

  <ShwTextH3>Default</ShwTextH3>

  <ShwGrid @gap="3rem" @columns={{1}} as |SG|>
    <SG.Item @label="Contextual components">
      <CodeFragmentWithContextualComponents @currentStep={{1}} />
    </SG.Item>
    {{! template-lint-disable no-potential-path-strings }}
    <SG.Item @label="@steps array">
      <CodeFragmentWithStepsArray @currentStep={{1}} />
    </SG.Item>
    {{! template-lint-enable no-potential-path-strings }}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Standalone</ShwTextH3>

  <ShwGrid @gap="3rem" @columns={{1}} as |SG|>
    <SG.Item @label="Contextual components">
      <CodeFragmentWithContextualComponents
        @isStandalone={{true}}
        @isInteractive={{false}}
        @currentStep={{1}}
      />
    </SG.Item>
    {{! template-lint-disable no-potential-path-strings }}
    <SG.Item @label="@steps array">
      <CodeFragmentWithStepsArray
        @isStandalone={{true}}
        @isInteractive={{false}}
        @currentStep={{1}}
      />
    </SG.Item>
    {{! template-lint-enable no-potential-path-strings }}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Number of steps changing based on input</ShwTextH3>

  <ShwGrid @columns={{1}} as |SG|>
    <SG.Item>
      <CodeFragmentWithVariableSteps />
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionExamples;
