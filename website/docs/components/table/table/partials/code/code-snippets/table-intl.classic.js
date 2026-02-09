import Component from '@glimmer/component';
import { service } from '@ember/service';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class Index extends Component {
  @service hdsIntl;

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
}
