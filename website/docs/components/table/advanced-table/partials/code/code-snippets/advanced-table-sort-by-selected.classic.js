import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  @tracked demoSortBySelectedData = [...FOLK_MUSIC_DATA].map(
    (row, index) => ({
      ...row,
      isSelected: index % 2 === 0,
    })
  );

  @action
  demoOnSelectionChangeSortBySelected({ selectableRowsStates }) {
    selectableRowsStates.forEach((row) => {
      const recordToUpdate = this.demoSortBySelectedData.find(
        (modelRow) => modelRow.id === row.selectionKey
      );
      if (recordToUpdate) {
        recordToUpdate.isSelected = row.isSelected ?? false;
      }
    });
  }
}
