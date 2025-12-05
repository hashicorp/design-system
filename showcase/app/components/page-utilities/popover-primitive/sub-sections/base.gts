/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import CodeFragmentWithButtonTrigger from 'showcase/components/page-utilities/popover-primitive/code-fragments/with-button-trigger';

const SubSectionBase: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwGrid @columns={{4}} @gap="2rem" {{style margin-bottom="6rem"}} as |SG|>
    <SG.Item @label="Base">
      <CodeFragmentWithButtonTrigger />
    </SG.Item>
    <SG.Item @label="With arrow">
      <CodeFragmentWithButtonTrigger @hasArrow={{true}} @arrowId="arrow-base" />
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionBase;
