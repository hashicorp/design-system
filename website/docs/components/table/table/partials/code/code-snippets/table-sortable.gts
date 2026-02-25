import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';

import { HdsTable } from '@hashicorp/design-system-components/components';

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
        (hash key="year" label="Release Year")
      }}
    >
      <:body as |B|>
        <B.Tr>
          <B.Td>{{B.data.artist}}</B.Td>
          <B.Td>{{B.data.album}}</B.Td>
          <B.Td>{{B.data.year}}</B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
  </template>
}
