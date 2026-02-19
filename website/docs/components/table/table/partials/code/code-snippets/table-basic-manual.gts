import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTable } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTable @caption="your custom, meaningful caption goes here">
    <:head as |H|>
      <H.Tr>
        <H.Th>Column Header One</H.Th>
        <H.Th>Column Header Two</H.Th>
        <H.Th>Column Header Three</H.Th>
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
</template>;

export default LocalComponent;
