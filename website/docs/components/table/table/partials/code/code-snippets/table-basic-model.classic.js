import Component from '@glimmer/component';

import FOLK_MUSIC_DATA from 'website/mocks/folk-music-data';

export default class LocalComponent extends Component {
  get model() {
    // example of data retrieved:
    //[
    //  {
    //    id: '1',
    //    attributes: {
    //      artist: 'Nick Drake',
    //      album: 'Pink Moon',
    //      year: '1972'
    //    },
    //  },
    //  {
    //    id: '2',
    //    attributes: {
    //      artist: 'The Beatles',
    //      album: 'Abbey Road',
    //      year: '1969'
    //    },
    //  },
    // ...

    return { myDemoData: FOLK_MUSIC_DATA };
  }
}
