import Route from '@ember/routing/route';

export default class ComponentsFormSelectRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    // notice: 'readonly' is not a valid attribute for `<select>`
    const STATES = ['default', 'disabled'];
    return {
      STATES,
    };
  }
}
