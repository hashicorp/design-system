import Component from '@glimmer/component';
import { service } from '@ember/service';
import { array, hash } from '@ember/helper';

import {
  HdsTable,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

import type HdsIntlService from '@hashicorp/design-system-components/services/hds-intl';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  @service declare readonly hdsIntl: HdsIntlService;

  get model() {
    return { myDemoData: FOLK_MUSIC_DATA };
  }

  get translations() {
    return {
      artist: this.hdsIntl.t('components.table.headers.artist', {
        default: 'Artist',
      }),
      album: this.hdsIntl.t('components.table.headers.album', {
        default: 'Album',
      }),
      year: this.hdsIntl.t('components.table.headers.year', {
        default: 'Year',
      }),
      other: this.hdsIntl.t('global.titles.other', {
        default: 'Other',
      }),
      overflowOptions: this.hdsIntl.t('components.table.overflowOptions', {
        default: 'Overflow Options',
      }),
    };
  }

  <template>
    <HdsTable
      @model={{this.model.myDemoData}}
      @columns={{array
        (hash key="artist" label=this.translations.artist isSortable=true)
        (hash key="album" label=this.translations.album isSortable=true)
        (hash key="year" label=this.translations.year isSortable=true)
        (hash key="other" label=this.translations.other)
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
                @text={{this.translations.overflowOptions}}
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
