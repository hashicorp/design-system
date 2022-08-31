import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class ComponentsTableRoute extends Route {
  queryParams = ['sortby', 'sortdescending'];
  @tracked sortby = 'year';
  @tracked sortdescending = false;

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

  // get records() {
  //   return this.model();
  // }

  // get sortedRecords() {
  //   const sorted = this.records.slice().sortBy(this.sortby || 'year');
  //   return this.sortdescending ? sorted.reverse() : sorted;
  // }
}
