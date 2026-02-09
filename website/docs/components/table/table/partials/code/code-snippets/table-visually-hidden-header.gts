import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import {
  HdsTable,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  get model() {
    return { myDemoData: FOLK_MUSIC_DATA };
  }

  <template>
    <HdsTable
      @model={{this.model.myDemoData}}
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Year" isSortable=true)
        (hash
          key="other"
          label="Select an action from the menu"
          isVisuallyHidden=true
          width="60px"
        )
      }}
    >
      <:body as |B|>
        <B.Tr>
          <B.Td>{{B.data.artist}}</B.Td>
          <B.Td>{{B.data.album}}</B.Td>
          <B.Td>{{B.data.year}}</B.Td>
          <B.Td>
            <HdsDropdown as |D|>
              <D.ToggleIcon
                @icon="more-horizontal"
                @text="Overflow Options"
                @hasChevron={{false}}
                @size="small"
              />
              <D.Interactive
                @href="#"
                @color="critical"
                @icon="trash"
              >Delete</D.Interactive>
            </HdsDropdown>
          </B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
  </template>
}
