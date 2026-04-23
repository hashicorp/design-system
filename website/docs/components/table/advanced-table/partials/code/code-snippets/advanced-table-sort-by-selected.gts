import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  @tracked demoSortBySelectedData = [...FOLK_MUSIC_DATA].map((row, index) => ({
    ...row,
    isSelected: index % 2 === 0,
  }));

  demoOnSelectionChangeSortBySelected = ({
    selectableRowsStates,
  }: HdsAdvancedTableOnSelectionChangeSignature) => {
    selectableRowsStates.forEach((row) => {
      const recordToUpdate = this.demoSortBySelectedData.find(
        (modelRow) => modelRow.id === row.selectionKey,
      );
      if (recordToUpdate) {
        recordToUpdate.isSelected = row.isSelected ?? false;
      }
    });
  };

  <template>
    <HdsAdvancedTable
      @isSelectable={{true}}
      @selectableColumnKey="isSelected"
      @onSelectionChange={{this.demoOnSelectionChangeSortBySelected}}
      @model={{this.demoSortBySelectedData}}
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Year" isSortable=true)
        (hash key="selection" label="Selected" isSortable=true)
      }}
      @sortBy="isSelected"
      @sortOrder="desc"
    >
      <:body as |B|>
        <B.Tr
          @selectionKey={{B.data.id}}
          @isSelected={{B.data.isSelected}}
          @selectionAriaLabelSuffix="row {{B.data.artist}} / {{B.data.album}}"
        >
          <B.Td>{{B.data.artist}}</B.Td>
          <B.Td>{{B.data.album}}</B.Td>
          <B.Td>{{B.data.year}}</B.Td>
          <B.Td>{{if B.data.isSelected "Yes" "No"}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
