/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';

import CodeFragmentWithEvents from '../code-fragments/with-events';

const SubSectionEvents: TemplateOnlyComponent = <template>
  <ShwTextH2>Events</ShwTextH2>

  <ShwTextBody>
    The CDS Accordion Item emits custom events when toggled. The
    <code>cds-accordion-item-beingtoggled</code>
    event fires before the toggle animation starts, and
    <code>cds-accordion-item-toggled</code>
    fires after the toggle animation completes.
  </ShwTextBody>

  <ShwGrid @columns={{1}} @gap="2rem" as |SG|>
    <SG.Item @label="Event listeners on accordion items">
      <CodeFragmentWithEvents />
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionEvents;
