/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import CodeFragmentWithToggleVariants from '../code-fragments/with-toggle-variants';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Favorite</ShwTextH2>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="Crd">
      <CodeFragmentWithToggleVariants @type="card" @favorite={{true}} />
    </SG.Item>
    <SG.Item @label="Card">
      <CodeFragmentWithToggleVariants
        @type="card"
        @favorite={{true}}
        @favoriteIcon="activity"
      />
    </SG.Item>
    <SG.Item @label="Flush">
      <CodeFragmentWithToggleVariants @type="flush" @favorite={{true}} />
    </SG.Item>
    <SG.Item @label="Flush">
      <CodeFragmentWithToggleVariants
        @type="flush"
        @favorite={{true}}
        @favoriteIcon="activity"
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionVariants;
