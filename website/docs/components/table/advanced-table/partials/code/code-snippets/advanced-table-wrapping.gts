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
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.myDemoData}}
      @hasResizableColumns={{true}}
      @columns={{array
        (hash key="artist" label="Artist" isSortable=true)
        (hash key="album" label="Album" isSortable=true)
        (hash key="year" label="Release Year")
      }}
    >
      <:body as |B|>
        <B.Tr>
          <B.Td>
            <div class="doc-advanced-table-cell-content-div">
              <span class="doc-advanced-table-text-truncate">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.artist}}
              </span>
            </div>
          </B.Td>
          <B.Td>
            <div class="doc-advanced-table-cell-content-div">
              <span class="doc-advanced-table-text-truncate">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.album}}
              </span>
            </div>
          </B.Td>
          <B.Td>
            <div class="doc-advanced-table-cell-content-div">
              <span class="doc-advanced-table-text-truncate">
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
                {{B.data.year}}
              </span>
            </div>
          </B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>

    {{! template-lint-disable no-forbidden-elements }}
    <style>
      .doc-advanced-table-cell-content-div {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      .doc-advanced-table-text-truncate {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    </style>
  </template>
}
