import Route from '@ember/routing/route';

export default class ComponentsCardRoute extends Route {
  model() {
    // TODO! these should come from the component file
    const ELEVATIONS = ['base', 'low', 'mid', 'high', 'higher'];
    return { ELEVATIONS };
  }
}
