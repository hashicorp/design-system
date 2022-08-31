import Route from '@ember/routing/route';

export default class ComponentsTableRoute extends Route {

  model() {
    return [
      { artist: 'Nick Drake', album: 'Pink Moon', year: '1972' },
      { artist: 'The Beatles', album: 'Abbey Road', year: '1969' },
      { artist: 'Melanie', album: 'Candles in the Rain', year: '1971' },
      { artist: 'Bob Dylan', album: 'Bringing It All Back Home', year: '1965' },
      { artist: 'James Taylor', album: 'Sweet Baby James', year: '1970' },
      {
        artist: 'Simon and Garfunkel',
        album: 'Bridge Over Troubled Waters',
        year: '1970',
      },
    ];
  }
}
