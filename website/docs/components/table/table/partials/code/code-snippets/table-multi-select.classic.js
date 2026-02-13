import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class Index extends Component {
  @tracked model = FOLK_MUSIC_DATA;

  @action
  onSelectionChange({
    selectionKey, // the `selectionKey` value for the selected row or "all" if the "select all" has been toggled
  }) {
    const recordToUpdate = this.model.find(
      (modelRow) => modelRow.id === selectionKey,
    );
    if (recordToUpdate) {
      recordToUpdate.isSelected = !recordToUpdate.isSelected;
    }
  };
}
