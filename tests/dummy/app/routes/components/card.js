import Route from '@ember/routing/route';

export default class ComponentsCardRoute extends Route {
  model() {
    // TODO! these should come from the component file
    const LEVELS = ['base', 'mid', 'high'];
    const BACKGROUNDS = ['neutral-0', 'neutral-50'];
    return { LEVELS, BACKGROUNDS };
  }
}
