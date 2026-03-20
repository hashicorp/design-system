import Component from '@glimmer/component';
import { action } from '@ember/object';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  get myDemoData() {
    // example of data retrieved:
    //[
    //  {
    //    id: '1',
    //    artist: 'Nick Drake',
    //    album: 'Pink Moon',
    //    year: '1972'
    //  },
    //  {
    //    id: '2',
    //    artist: 'The Beatles',
    //    album: 'Abbey Road',
    //    year: '1969'
    //  },
    // ...

    return FOLK_MUSIC_DATA;
  }

  @action
  demoOnSelectionChange({
    selectionKey, // the `selectionKey` value for the selected row or "all" if the "select all" has been toggled
    selectionCheckboxElement, // the checkbox DOM element toggled by the user
    selectableRowsStates, // an array of objects describing each displayed "row" state (its `selectionKey` value and its `isSelected` state)
    selectedRowsKeys // an array of all the `selectionKey` values of the currently selected rows
  }) {
    console.group('demoOnSelectionChange called with arguments');
    console.log('selectionKey:', selectionKey);
    console.log('selectionCheckboxElement:', selectionCheckboxElement);
    console.log('selectableRowsStates:', selectableRowsStates);
    console.log('selectedRowsKeys:', selectedRowsKeys);
    console.groupEnd();
  }
}
