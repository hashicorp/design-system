import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import {
  HdsAdvancedTable,
  HdsApplicationState,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  get emptyData() {
    return [];
  }

  <template>
    <HdsAdvancedTable
      @model={{this.emptyData}}
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Release Year")
      }}
      @density="short"
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.artist}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.album}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.year}}</B.Td>
        </B.Tr>
      </:body>
      <:emptyState>
        <HdsApplicationState as |A|>
          <A.Header @title="No data to display" />
          <A.Body
            @text="No results were found with the selected filters. Please clear or update the filters."
          />
          <A.Footer as |F|>
            <F.Button @text="Clear filters" />
          </A.Footer>
        </HdsApplicationState>
      </:emptyState>
    </HdsAdvancedTable>
  </template>
}
