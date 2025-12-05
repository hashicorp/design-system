/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import CodeFragmentWithDefaultImplementationComponents from 'showcase/components/page-components/stepper/list/code-fragments/with-default-implementation';

const SubSectionExampleImplementations: TemplateOnlyComponent = <template>
  <ShwTextH2>Example implementations</ShwTextH2>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item @label="Default">
      <CodeFragmentWithDefaultImplementationComponents @currentStep={{1}} />
    </SG.Item>
    <SG.Item @label="Processing state">
      <CodeFragmentWithDefaultImplementationComponents
        @currentStep={{1}}
        @isProcessing={{true}}
      />
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionExampleImplementations;
