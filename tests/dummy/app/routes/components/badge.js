import Route from '@ember/routing/route';

export default class ComponentsBadgeRoute extends Route {
  model() {
    // TODO! these should come from the components' files
    const BADGE_SIZES = ['small', 'medium', 'large'];
    const BADGE_TYPES = ['filled', 'inverted', 'outlined'];
    const BADGE_COLORS = [
      'neutral',
      'neutral-dark-mode',
      'highlight',
      'success',
      'warning',
      'critical',
    ];
    const BADGE_COUNT_SIZES = ['small', 'medium', 'large'];
    const BADGE_COUNT_TYPES = ['filled', 'inverted', 'outlined'];
    const BADGE_COUNT_COLORS = ['neutral', 'neutral-dark-mode'];
    return {
      BADGE_SIZES,
      BADGE_TYPES,
      BADGE_COLORS,
      BADGE_COUNT_SIZES,
      BADGE_COUNT_TYPES,
      BADGE_COUNT_COLORS,
    };
  }
}
