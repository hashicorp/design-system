import Route from '@ember/routing/route';

export default class FoundationsElevationRoute extends Route {
  model() {
    const ELEVATIONS = ['inset', 'low', 'mid', 'high', 'higher', 'overlay'];
    const SURFACES = [
      'inset',
      'base',
      'low',
      'mid',
      'high',
      'higher',
      'overlay',
    ];
    return { ELEVATIONS, SURFACES };
  }
}
