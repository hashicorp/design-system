import Route from '@ember/routing/route';

export default class ComponentsTabsRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const TAG_STATES = ['default', 'hover', 'focus'];
    return { TAG_STATES };
  }
}
