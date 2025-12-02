import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsAccordion,
  HdsAlert,
  HdsTable,
} from '@hashicorp/design-system-components/components';
import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

interface AccordionHtmlContentSignature {
  Element: HdsAccordionSignature['Element'];
}

const AccordionHtmlContent: TemplateOnlyComponent<AccordionHtmlContentSignature> =
  <template>
    <HdsAccordion ...attributes as |A|>
      <A.Item @isOpen={{true}}>
        <:toggle>
          <HdsAlert @type="compact" @color="success" as |A|>
            <A.Title>Title</A.Title>
            <A.Description>Plan finished
              <small>22 days ago</small></A.Description>
          </HdsAlert>
        </:toggle>
        <:content>
          <p class="hds-typography-body-200">
            <strong>Queued:</strong>
            9 days ago >
            <strong>Finished:</strong>
            9 days ago
          </p>
          <HdsTable @caption="Example table">
            <:head as |H|>
              <H.Tr>
                <H.Th>Name</H.Th>
                <H.Th>Type</H.Th>
                <H.Th>Value</H.Th>
              </H.Tr>
            </:head>
            <:body as |B|>
              <B.Tr>
                <B.Td>Cell one A</B.Td>
                <B.Td>Cell two A</B.Td>
                <B.Td>Cell three A</B.Td>
              </B.Tr>
              <B.Tr>
                <B.Td>Cell one B</B.Td>
                <B.Td>Cell two B</B.Td>
                <B.Td>Cell three B</B.Td>
              </B.Tr>
            </:body>
          </HdsTable>
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>;

export default AccordionHtmlContent;
