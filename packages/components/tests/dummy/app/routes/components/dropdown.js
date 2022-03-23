import Route from '@ember/routing/route';

// TODO! import from the component JS file
const TOGGLE_BUTTON_COLORS = ['primary', 'secondary'];
const TOGGLE_MORE_SIZES = ['medium', 'small'];
export default class ComponentsDropdownRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];
    return { TOGGLE_BUTTON_COLORS, TOGGLE_MORE_SIZES, STATES };
  }
}
