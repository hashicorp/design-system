/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import CodeFragmentBasicExample from '../code-fragments/basic-example';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Flush variant</ShwTextH2>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="Default (not flush)">
      <CodeFragmentBasicExample @isFlush={{false}} />
    </SG.Item>
    <SG.Item @label="Flush">
      <CodeFragmentBasicExample @isFlush={{true}} />
    </SG.Item>
  </ShwGrid>

  <ShwDivider />

  <ShwTextH2>Disabled</ShwTextH2>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="Enabled (default)">
      <CodeFragmentBasicExample @disabled={{false}} />
    </SG.Item>
    <SG.Item @label="Disabled">
      <CodeFragmentBasicExample @disabled={{true}} />
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionContent;
