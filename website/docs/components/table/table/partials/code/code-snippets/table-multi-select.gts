import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';

import { HdsTable } from '@hashicorp/design-system-components/components';
import type { HdsTableOnSelectionChangeSignature } from '@hashicorp/design-system-components/components/hds/table/types';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  @tracked model = FOLK_MUSIC_DATA;

  onSelectionChange = ({
    selectionKey, // the `selectionKey` value for the selected row or "all" if the "select all" has been toggled
    selectionCheckboxElement, // the checkbox DOM element toggled by the user
    selectableRowsStates, // an array of objects describing each displayed "row" state (its `selectionKey` value and its `isSelected` state)
    selectedRowsKeys, // an array of all the `selectionKey` values of the currently selected rows
  }: HdsTableOnSelectionChangeSignature) => {
    const recordToUpdate = this.model.find(
      (modelRow) => modelRow.id === selectionKey,
    );
    if (recordToUpdate) {
      recordToUpdate.isSelected = !recordToUpdate.isSelected;
    }
  };

  <template>
    <HdsTable
      @isSelectable={{true}}
      @onSelectionChange={{this.onSelectionChange}}
      @model={{this.model}}
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
    </HdsTable>
  </template>
}
