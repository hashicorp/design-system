/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import CodeFragmentWithContextualComponents from 'showcase/components/page-components/stepper/nav/code-fragments/with-contextual-components';

const SubSectionInteractivity: TemplateOnlyComponent = <template>
  <ShwTextH2>Interactivity</ShwTextH2>

  <ShwGrid @gap="3rem" @columns={{1}} as |SG|>
    <SG.Item @label="Interactive">
      <CodeFragmentWithContextualComponents @currentStep={{1}} />
    </SG.Item>
    <SG.Item @label="Non-interactive">
      <CodeFragmentWithContextualComponents
        @isInteractive={{false}}
        @currentStep={{1}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionInteractivity;
