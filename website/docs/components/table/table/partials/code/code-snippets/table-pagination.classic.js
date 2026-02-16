import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

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

  @action
  onSelectionChange({ selectableRowsStates }) {
    selectableRowsStates.forEach((row) => {
      const recordToUpdate = FOLK_MUSIC_DATA.find(
        (modelRow) => modelRow.id === row.selectionKey
      );
      if (recordToUpdate) {
        recordToUpdate.isSelected = row.isSelected;
      }
    });
  }

  @action
  onPageChange(page, pageSize) {
    this.currentPage = page;
    this.currentPageSize = pageSize;
  }

  @action
  onPageSizeChange(pageSize) {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.currentPage = 1;
    this.currentPageSize = pageSize;
  }
}
