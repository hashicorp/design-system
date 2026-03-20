import Component from '@glimmer/component';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  get myDemoData() {
    return FOLK_MUSIC_DATA;
  }
}
