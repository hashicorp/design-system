import Route from '@ember/routing/route';

export default class ComponentsCardRoute extends Route {
  model() {
    // TODO! these should come from the component file
    const CONTAINER_LEVELS = ['base', 'mid', 'high'];
    const CONTAINER_BACKGROUNDS = ['neutral-0', 'neutral-50'];
    return { CONTAINER_LEVELS, CONTAINER_BACKGROUNDS };
  }
}
