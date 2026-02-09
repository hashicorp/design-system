import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import {
  HdsTable,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

import hdsT from '@hashicorp/design-system-components/helpers/hds-t';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  get model() {
    return { myDemoData: FOLK_MUSIC_DATA };
  }

  <template>
    <HdsTable
      @model={{this.model.myDemoData}}
      @columns={{array
        (hash
          key="artist"
          label=(hdsT "components.table.headers.artist")
          isSortable=true
        )
        (hash
          key="album"
          label=(hdsT "components.table.headers.album")
          isSortable=true
        )
        (hash
          key="year"
          label=(hdsT "components.table.headers.year")
          isSortable=true
        )
        (hash key="other" label=(hdsT "global.titles.other"))
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
              <D.Interactive @href="#">Create</D.Interactive>
              <D.Interactive @href="#">Read</D.Interactive>
              <D.Interactive @href="#">Update</D.Interactive>
              <D.Separator />
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
