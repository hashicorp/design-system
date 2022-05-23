import Route from '@ember/routing/route';

export default class ComponentsFormRadioRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    // notice: 'readonly' is not a valid attribute for `<radio>`
    const STATES = ['default', 'disabled'];
    return {
      STATES,
    };
  }
}
