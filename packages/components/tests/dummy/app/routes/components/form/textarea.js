import Route from '@ember/routing/route';

export default class ComponentsFormTextareaRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'readonly', 'disabled'];
    return {
      STATES,
    };
  }
}
