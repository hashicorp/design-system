import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';

import {
  HdsAdvancedTable,
  HdsPaginationNumbered,
} from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

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

  handleSelectionChange = ({
    selectableRowsStates,
  }: HdsAdvancedTableOnSelectionChangeSignature) => {
    selectableRowsStates.forEach((row) => {
      const recordToUpdate = FOLK_MUSIC_DATA.find(
        (modelRow) => modelRow.id === row.selectionKey,
      );
      if (recordToUpdate) {
        recordToUpdate.isSelected = row.isSelected;
      }
    });
  };

  handlePageChange = (page: number, pageSize: number) => {
    this.currentPage = page;
    this.currentPageSize = pageSize;
  };

  handlePageSizeChange = (pageSize: number) => {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.currentPage = 1;
    this.currentPageSize = pageSize;
  };

  <template>
    <div class="doc-advanced-table-multiselect-with-pagination-demo">
      <HdsAdvancedTable
        @isSelectable={{true}}
        @onSelectionChange={{this.handleSelectionChange}}
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{this.paginatedData}}
        @columns={{array
          (hash key="artist" label="Artist")
          (hash key="album" label="Album")
          (hash key="year" label="Year")
        }}
      >
        <:body as |B|>
          <B.Tr
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @selectionKey={{B.data.id}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @isSelected={{B.data.isSelected}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @selectionAriaLabelSuffix="row {{B.data.artist}} / {{B.data.album}}"
          >
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.artist}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.album}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.year}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>
      <HdsPaginationNumbered
        @totalItems={{this.totalItems}}
        @currentPage={{this.currentPage}}
        @pageSizes={{array 2 4}}
        @currentPageSize={{this.currentPageSize}}
        @onPageChange={{this.handlePageChange}}
        @onPageSizeChange={{this.handlePageSizeChange}}
        @ariaLabel="Pagination for multi-select table"
      />
    </div>
  </template>
}
