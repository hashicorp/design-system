import Component from '@glimmer/component';

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
}
