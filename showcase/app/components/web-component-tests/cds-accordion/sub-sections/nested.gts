/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import CodeFragmentNested from '../code-fragments/nested';

const SubSectionNested: TemplateOnlyComponent = <template>
  <ShwTextH2>Nested Accordions</ShwTextH2>

  <ShwGrid @columns={{1}} @gap="2rem" as |SG|>
    <SG.Item @label="Nested accordions">
      <CodeFragmentNested />
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionNested;
