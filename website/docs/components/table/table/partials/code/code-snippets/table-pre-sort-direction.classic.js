import Component from '@glimmer/component';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class Index extends Component {
  get model() {
    return { myDemoData: FOLK_MUSIC_DATA };
  }
}
