import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';

import {
  HdsTable,
  HdsPaginationNumbered,
} from '@hashicorp/design-system-components/components';
import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  @tracked currentPage = 1;
  @tracked currentPageSize = 2;

  get paginatedData() {
    const start = (this.currentPage - 1) * this.currentPageSize;
    const end = this.currentPage * this.currentPageSize;
    return FOLK_MUSIC_DATA.slice(start, end);
  }

  get totalItems() {
    return FOLK_MUSIC_DATA.length;
  }

  onSelectionChange = ({
    selectableRowsStates,
  }: HdsTableOnSelectionChangeSignature) => {
    selectableRowsStates.forEach((row) => {
      const recordToUpdate = FOLK_MUSIC_DATA.find(
        (modelRow) => modelRow.id === row.selectionKey,
      );
      if (recordToUpdate) {
        recordToUpdate.isSelected = row.isSelected;
      }
    });
  };

  onPageChange = (page: number, pageSize: number) => {
    this.currentPage = page;
    this.currentPageSize = pageSize;
  };

  onPageSizeChange = (pageSize: number) => {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.currentPage = 1;
    this.currentPageSize = pageSize;
  };

  <template>
    <div class="doc-table-multiselect-with-pagination-demo">
      <HdsTable
        @isSelectable={{true}}
        @onSelectionChange={{this.onSelectionChange}}
        @model={{this.paginatedData}}
        @columns={{array
          (hash key="artist" label="Artist")
          (hash key="album" label="Album")
          (hash key="year" label="Year")
        }}
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
          </B.Tr>
        </:body>
      </HdsTable>
      <HdsPaginationNumbered
        @totalItems={{this.totalItems}}
        @currentPage={{this.currentPage}}
        @pageSizes={{array 2 4}}
        @currentPageSize={{this.currentPageSize}}
        @onPageChange={{this.onPageChange}}
        @onPageSizeChange={{this.onPageSizeChange}}
        @ariaLabel="Pagination for multi-select table"
      />
    </div>
  </template>
}
