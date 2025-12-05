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

import {
  HdsButton,
  HdsCardContainer,
  HdsFlyout,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithToggleVariants from '../code-fragments/with-toggle-variants';

const SubSectionContext: TemplateOnlyComponent = <template>
  <ShwTextH2>Context</ShwTextH2>

  <ShwTextH3>Flush Accordion used within containers</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="In a Card w/ no padding">
      <HdsCardContainer @hasBorder={{true}}>
        <CodeFragmentWithToggleVariants @type="flush" />
      </HdsCardContainer>
    </SG.Item>

    <SG.Item @label="in a Card w/ padding">
      <HdsCardContainer @hasBorder={{true}} {{style padding="16px"}}>
        <CodeFragmentWithToggleVariants @type="flush" />
      </HdsCardContainer>
    </SG.Item>

    <SG.Item @label="in a Flyout" class="shw-component-flyout-sample-item">
      <HdsFlyout open id="flyout-example-one-action" as |F|>
        <F.Header>Title</F.Header>
        <F.Body>
          <CodeFragmentWithToggleVariants @type="flush" />
        </F.Body>
        <F.Footer>
          <HdsButton type="submit" @text="Primary" />
        </F.Footer>
      </HdsFlyout>
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionContext;
