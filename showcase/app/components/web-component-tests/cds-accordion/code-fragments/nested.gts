/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsCdsAccordion,
  HdsCdsAccordionItem,
} from '@hashicorp/design-system-components/components';

const CodeFragmentNested: TemplateOnlyComponent = <template>
  <HdsCdsAccordion>
    <HdsCdsAccordionItem title="Parent Item 1" open>
      <p>This is content in the parent item.</p>

      <HdsCdsAccordion>
        <HdsCdsAccordionItem title="Nested Item 1.1">
          <p>This is content in a nested accordion item.</p>
        </HdsCdsAccordionItem>
        <HdsCdsAccordionItem title="Nested Item 1.2">
          <p>This is another nested accordion item.</p>
        </HdsCdsAccordionItem>
      </HdsCdsAccordion>
    </HdsCdsAccordionItem>

    <HdsCdsAccordionItem title="Parent Item 2">
      <p>This parent item also contains a nested accordion.</p>

      <HdsCdsAccordion>
        <HdsCdsAccordionItem title="Nested Item 2.1">
          <p>Nested content here.</p>
        </HdsCdsAccordionItem>
        <HdsCdsAccordionItem title="Nested Item 2.2">
          <p>More nested content.</p>
        </HdsCdsAccordionItem>
        <HdsCdsAccordionItem title="Nested Item 2.3">
          <p>Even more nested content.</p>
        </HdsCdsAccordionItem>
      </HdsCdsAccordion>
    </HdsCdsAccordionItem>

    <HdsCdsAccordionItem title="Parent Item 3">
      <p>This is a regular item without nesting.</p>
    </HdsCdsAccordionItem>
  </HdsCdsAccordion>
</template>;

export default CodeFragmentNested;
