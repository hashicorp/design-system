import Route from '@ember/routing/route';

export default class ComponentsBadgeRoute extends Route {
  model() {
    // TODO! likely these come from the component `_config.js` file
    const SIZES = ['small', 'medium', 'large'];
    const TYPES = ['filled', 'inverted', 'outlined'];
    const COLORS = [
      'neutral',
      'neutral-dark-mode',
      'highlight',
      'success',
      'warning',
      'critical',
    ];
    return { SIZES, TYPES, COLORS };
  }
}
