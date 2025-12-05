/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import CodeFragmentWithContextualComponents from 'showcase/components/page-components/stepper/nav/code-fragments/with-contextual-components';
import CodeFragmentWithOverlayContent from 'showcase/components/page-components/stepper/nav/code-fragments/with-overlay-content';
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

  <ShwDivider @level={{2}} />

  <ShwTextH3>Overlay components within step content</ShwTextH3>
  <ShwTextBody>
    When the flyout and modal are open their overlays should appear above the
    example block.
  </ShwTextBody>

  <ShwGrid @columns={{2}} {{style marginTop="32px"}} as |SG|>
    <SG.Item>
      <CodeFragmentWithOverlayContent />
    </SG.Item>
    <SG.Item>
      <ShwPlaceholder
        @text="Element with z-index: 1"
        @background="#d2f4ff"
        class="shw-component-stepper-nav-mock-z-index"
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionExamples;
