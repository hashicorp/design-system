import Component from '@glimmer/component';

import { HdsTable } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  get myDataItems() {
    return [
      {
        product: 'Terraform',
        brandColor: 'purple',
        usesHelios: true,
      },
      {
        product: 'Nomad',
        brandColor: 'green',
        usesHelios: true,
      },
      {
        product: 'Vault',
        brandColor: 'yellow',
        usesHelios: true,
      },
    ];
  }

  <template>
    <HdsTable @caption="Products that use Helios">
      <:head as |H|>
        <H.Tr>
          <H.Th>Product</H.Th>
          <H.Th>Brand Color</H.Th>
          <H.Th>Uses Helios</H.Th>
        </H.Tr>
      </:head>
      <:body as |B|>
        {{#each this.myDataItems as |item|}}
          <B.Tr>
            <B.Td>{{item.product}}</B.Td>
            <B.Td>{{item.brandColor}}</B.Td>
            <B.Td>{{item.usesHelios}}</B.Td>
          </B.Tr>
        {{/each}}
      </:body>
    </HdsTable>
  </template>
}
