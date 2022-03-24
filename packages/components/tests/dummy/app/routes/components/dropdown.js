import Route from '@ember/routing/route';

import {
  BUTTON_COLORS as TOGGLE_BUTTON_COLORS,
  MORE_SIZES as TOGGLE_MORE_SIZES,
  ITEM_COLORS,
} from '@hashicorp/design-system-components/components/hds/dropdown/toggle';

export default class ComponentsDropdownRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const TOGGLE_STATES = ['default', 'hover', 'active', 'focus', 'disabled'];
    const ITEM_STATES = ['default', 'hover', 'active', 'focus', 'disabled'];
    return {
      TOGGLE_BUTTON_COLORS,
      TOGGLE_MORE_SIZES,
      TOGGLE_STATES,
      ITEM_COLORS,
      ITEM_STATES,
    };
  }
}
