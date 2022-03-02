import Route from '@ember/routing/route';

export const ELEVATIONS = ['inset', 'low', 'mid', 'high', 'higher', 'overlay'];
export const SURFACES = [
  'inset',
  'base',
  'low',
  'mid',
  'high',
  'higher',
  'overlay',
];
export default class FoundationsElevationRoute extends Route {
  model() {
    return { ELEVATIONS, SURFACES };
  }
}
