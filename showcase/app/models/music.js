import Model, { attr } from '@ember-data/model';

export default class MusicModel extends Model {
  @attr('string') artist;
  @attr('string') album;
  @attr('string') year;
}
