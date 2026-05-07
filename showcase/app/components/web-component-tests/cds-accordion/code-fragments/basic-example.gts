/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsCdsAccordion,
  HdsCdsAccordionItem,
} from '@hashicorp/design-system-components/components';
import {
  CDS_ACCORDION_SIZE_OPTIONS,
  CDS_ACCORDION_ALIGNMENT_OPTIONS,
} from '@hashicorp/design-system-components/components/hds/cds-accordion/index';

export interface CodeFragmentBasicExampleSignature {
  Args: {
    disabled?: boolean;
    isFlush?: boolean;
    size?: (typeof CDS_ACCORDION_SIZE_OPTIONS)[number];
    align?: (typeof CDS_ACCORDION_ALIGNMENT_OPTIONS)[number];
  };
  Element: HTMLDivElement;
}

const CodeFragmentBasicExample: TemplateOnlyComponent<CodeFragmentBasicExampleSignature> =
  <template>
    <HdsCdsAccordion
      @alignment={{@align}}
      @disabled={{@disabled}}
      @isFlush={{@isFlush}}
      @size={{@size}}
    >
      <HdsCdsAccordionItem title="Section 1 title">
        <p>Content for section 1</p>
      </HdsCdsAccordionItem>
      <HdsCdsAccordionItem title="Section 2 title">
        <p>Content for section 2</p>
      </HdsCdsAccordionItem>
      <HdsCdsAccordionItem title="Section 3 title">
        <p>Content for section 3</p>
      </HdsCdsAccordionItem>
    </HdsCdsAccordion>
  </template>;

export default CodeFragmentBasicExample;
