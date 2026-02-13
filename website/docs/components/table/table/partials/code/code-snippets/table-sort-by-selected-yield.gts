import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { HdsTable } from '@hashicorp/design-system-components/components';
import type {
  HdsTableOnSelectionChangeSignature,
  HdsTableThSortOrder,
} from '@hashicorp/design-system-components/components/hds/table/types';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';
import type { FolkMusic } from 'website/mocks/folk-music-data';

const MODEL: FolkMusic[] = [...FOLK_MUSIC_DATA].map((row, index) => ({
  ...row,
  isSelected: index % 2 === 0,
}));

export default class LocalComponent extends Component {
  @tracked sortBy = 'isSelected';
  @tracked sortOrder: HdsTableThSortOrder = 'desc';

  get sortedData() {
    const clonedData = Array.from(MODEL);

    clonedData.sort((s1, s2) => {
      const sortKey = this.sortBy as keyof FolkMusic;
      const v1 = s1[sortKey];
      const v2 = s2[sortKey];

      if (v1 && v2) {
        if (v1 < v2) {
          return this.sortOrder === 'asc' ? -1 : 1;
        }

        if (v1 > v2) {
          return this.sortOrder === 'asc' ? 1 : -1;
        }
      }

      return 0;
    });

    return clonedData;
  }

  onSelectionChange = ({
    selectionKey,
    selectionCheckboxElement,
  }: HdsTableOnSelectionChangeSignature) => {
    if (selectionKey === 'all') {
      MODEL.forEach((modelRow) => {
        modelRow.isSelected = selectionCheckboxElement?.checked;
      });
    } else {
      const recordToUpdate = MODEL.find(
        (modelRow) => modelRow.id === selectionKey,
      );

      if (recordToUpdate) {
        recordToUpdate.isSelected = selectionCheckboxElement?.checked;
      }
    }
  };

  onSort = (sortBy: string, sortOrder: HdsTableThSortOrder) => {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
  };

  <template>
    <HdsTable
      @isSelectable={{true}}
      @selectableColumnKey="isSelected"
      @onSelectionChange={{this.onSelectionChange}}
      @sortBy={{this.sortBy}}
      @sortOrder={{this.sortOrder}}
      @onSort={{this.onSort}}
    >
      <:head as |H|>
        <H.Tr>
          <H.Th>Artist</H.Th>
          <H.Th>Album</H.Th>
          <H.Th>Year</H.Th>
        </H.Tr>
      </:head>
      <:body as |B|>
        {{#each this.sortedData as |data|}}
          <B.Tr
            @selectionKey={{data.id}}
            @isSelected={{data.isSelected}}
            @selectionAriaLabelSuffix="row {{data.artist}} / {{data.album}}"
          >
            <B.Td>{{data.artist}}</B.Td>
            <B.Td>{{data.album}}</B.Td>
            <B.Td>{{data.year}}</B.Td>
          </B.Tr>
        {{/each}}
      </:body>
    </HdsTable>
  </template>
}
