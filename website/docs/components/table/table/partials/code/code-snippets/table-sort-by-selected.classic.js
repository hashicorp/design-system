import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  @tracked model = [...FOLK_MUSIC_DATA].map((row, index) => ({
    ...row,
    isSelected: index % 2 === 0,
  }));

  @action
  onSelectionChange({
    selectableRowsStates, // an array of objects representing the selection state of all selectable rows in
  }) {
    selectableRowsStates.forEach((row) => {
      const recordToUpdate = this.model.find(
        (modelRow) => modelRow.id === row.selectionKey,
      );
      if (recordToUpdate) {
        recordToUpdate.isSelected = row.isSelected ?? false;
      }
    });
  };
}
