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
        (hash label="Actions" align="right")
      }}
    >
      <:body as |B|>
        <B.Tr>
          <B.Td>{{B.data.artist}}</B.Td>
          <B.Td>{{B.data.album}}</B.Td>
          <B.Td @align="right">
            <HdsDropdown @isInline={{true}} as |dd|>
              <dd.ToggleIcon
                @icon="more-horizontal"
                @text="Overflow Options"
                @hasChevron={{false}}
                @size="small"
              />
              <dd.Interactive @route="components">Create</dd.Interactive>
              <dd.Interactive @route="components">Read</dd.Interactive>
              <dd.Interactive @route="components">Update</dd.Interactive>
              <dd.Separator />
              <dd.Interactive
                @route="components"
                @color="critical"
                @icon="trash"
              >Delete</dd.Interactive>
            </HdsDropdown>
          </B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
  </template>
}
