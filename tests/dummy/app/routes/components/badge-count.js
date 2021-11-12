import Route from '@ember/routing/route';

export default class ComponentsBadgeCountRoute extends Route {
  model() {
    // TODO! these should come from the component file
    const SIZES = ['small', 'medium', 'large'];
    const TYPES = ['filled', 'inverted', 'outlined'];
    const COLORS = ['neutral', 'neutral-dark-mode'];
    return { SIZES, TYPES, COLORS };
  }
}
