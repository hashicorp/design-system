import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import {
  HdsAdvancedTable,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';
import hdsT from '@hashicorp/design-system-components/helpers/hds-t';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  get myDemoData() {
    return FOLK_MUSIC_DATA;
  }

  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.myDemoData}}
      @columns={{array
        (hash
          key="artist"
          label=(hdsT "components.table.headers.artist" default="Artist")
          isSortable=true
        )
        (hash
          key="album"
          label=(hdsT "components.table.headers.album" default="Album")
          isSortable=true
        )
        (hash
          key="year"
          label=(hdsT "components.table.headers.year" default="Year")
          isSortable=true
        )
        (hash key="other" label=(hdsT "global.titles.other" default="Other"))
      }}
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.artist}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.album}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
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
    </HdsAdvancedTable>
  </template>
}
