import Route from '@ember/routing/route';

export default class ComponentsCopyButtonRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = [
      'default',
      'hover',
      'active',
      'focus',
      'disabled',
      'success',
    ];
    return { STATES };
  }
}
