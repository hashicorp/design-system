import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

const MODEL = [...FOLK_MUSIC_DATA].map((row, index) => ({
  ...row,
  isSelected: index % 2 === 0,
}));

export default class Index extends Component {
  @tracked sortBy = 'isSelected';
  @tracked sortOrder = 'desc';

  get sortedData() {
    const clonedData = Array.from(MODEL);

    clonedData.sort((s1, s2) => {
      const v1 = s1[this.sortBy];
      const v2 = s2[this.sortBy];

      if (v1 < v2) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }

      if (v1 > v2) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return clonedData;
  }

  @action
  onSelectionChange({
    selectionKey,
    selectionCheckboxElement,
  }) {
    if (selectionKey === 'all') {
      MODEL.forEach((modelRow) => {
        modelRow.isSelected = selectionCheckboxElement.checked;
      });
    } else {
      const recordToUpdate = MODEL.find(
        (modelRow) => modelRow.id === selectionKey
      );

      if (recordToUpdate) {
        recordToUpdate.isSelected = selectionCheckboxElement.checked;
      }
    }
  }

  @action
  onSort(sortBy, sortOrder) {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
  }
}
