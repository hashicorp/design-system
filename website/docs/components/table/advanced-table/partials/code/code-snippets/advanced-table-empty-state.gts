import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  get emptyData() {
    return [];
  }

  <template>
    <HdsAdvancedTable
      @model={{this.emptyData}}
      @columns={{array
        (hash label="Artist")
        (hash label="Album")
        (hash label="Year")
      }}
    >
      <:body as |B|>
        <B.Tr>
          <B.Td>{{B.data.artist}}</B.Td>
          <B.Td>{{B.data.album}}</B.Td>
          <B.Td>{{B.data.year}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
