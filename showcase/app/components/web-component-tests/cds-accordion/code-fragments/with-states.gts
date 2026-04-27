/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsCdsAccordion,
  HdsCdsAccordionItem,
} from '@hashicorp/design-system-components/components';

import { CDS_ACCORDION_SIZE_OPTIONS } from '@hashicorp/design-system-components/components/hds/cds-accordion/index';

export interface CodeFragmentWithStatesSignature {
  Args: {
    size?: (typeof CDS_ACCORDION_SIZE_OPTIONS)[number];
  };
  Element: HTMLDivElement;
}

const CodeFragmentWithStates: TemplateOnlyComponent<CodeFragmentWithStatesSignature> =
  <template>
    <HdsCdsAccordion @size={{@size}}>
      <HdsCdsAccordionItem title="Default state">
        <p>This is a normal accordion item in default state.</p>
      </HdsCdsAccordionItem>
      <HdsCdsAccordionItem title="Open state" open>
        <p>This accordion item is open by default.</p>
      </HdsCdsAccordionItem>
      <HdsCdsAccordionItem title="Disabled state" disabled={{true}}>
        <p>This accordion item is disabled.</p>
      </HdsCdsAccordionItem>
    </HdsCdsAccordion>
  </template>;

export default CodeFragmentWithStates;
