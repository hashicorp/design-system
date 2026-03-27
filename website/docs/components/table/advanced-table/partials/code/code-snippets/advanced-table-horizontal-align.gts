import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import {
  HdsAdvancedTable,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

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

  <template>
    <HdsAdvancedTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.myDemoData}}
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash label="Actions" align="right")
      }}
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.artist}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
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
    </HdsAdvancedTable>
  </template>
}
