import Route from '@ember/routing/route';

export default class ComponentsFormToggleRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    // notice: 'readonly' is not a valid attribute for `<checkbox>`
    const STATES = ['default', 'disabled'];
    return {
      STATES,
    };
  }
}
