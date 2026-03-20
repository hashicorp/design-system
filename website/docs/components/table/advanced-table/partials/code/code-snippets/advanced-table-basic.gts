import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

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
      @model={{this.myDemoData}}
      @columns={{array
        (hash label="Artist")
        (hash label="Album")
        (hash label="Year")
      }}
    >
      <:body as |B|>
        <B.Tr>
          <B.Td>{{B.data.artist}}</B.Td>
          <B.Td>{{B.data.album}}</B.Td>
          <B.Td>{{B.data.year}}</B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
