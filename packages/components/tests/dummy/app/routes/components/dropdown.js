import Route from '@ember/routing/route';

import { COLORS as TOGGLE_BUTTON_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/toggle-button';
import { COLORS as ITEM_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item';

export default class ComponentsDropdownRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const TOGGLE_STATES = ['default', 'hover', 'active', 'focus'];
    const ITEM_STATES = ['default', 'hover', 'active', 'focus'];
    return {
      TOGGLE_BUTTON_COLORS,
      TOGGLE_STATES,
      ITEM_COLORS,
      ITEM_STATES,
    };
  }
}
