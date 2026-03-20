import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';
import type { HdsAdvancedTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/types';

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

  demoOnSelectionChange = ({
    selectionKey, // the `selectionKey` value for the selected row or "all" if the "select all" has been toggled
    selectionCheckboxElement, // the checkbox DOM element toggled by the user
    selectableRowsStates, // an array of objects describing each displayed "row" state (its `selectionKey` value and its `isSelected` state)
    selectedRowsKeys, // an array of all the `selectionKey` values of the currently selected rows
  }: HdsAdvancedTableOnSelectionChangeSignature) => {
    console.group('demoOnSelectionChange called with arguments');
    console.log('selectionKey:', selectionKey);
    console.log('selectionCheckboxElement:', selectionCheckboxElement);
    console.log('selectableRowsStates:', selectableRowsStates);
    console.log('selectedRowsKeys:', selectedRowsKeys);
    console.groupEnd();
  };

  <template>
    <HdsAdvancedTable
      @isSelectable={{true}}
      @onSelectionChange={{this.demoOnSelectionChange}}
      @model={{this.myDemoData}}
      @columns={{array
        (hash key="artist" label="Artist")
        (hash key="album" label="Album")
        (hash key="year" label="Year")
      }}
    >
      <:body as |B|>
        <B.Tr
          @selectionKey={{B.data.id}}
          @selectionAriaLabelSuffix="row {{B.data.artist}} / {{B.data.album}}"
        >
          <B.Td>{{B.data.artist}}</B.Td>
          <B.Td>{{B.data.album}}</B.Td>
          <B.Td>{{B.data.year}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
