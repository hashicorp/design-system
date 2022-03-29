import Route from '@ember/routing/route';

import { COLORS as TOGGLE_BUTTON_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/toggle-button';
import { SIZES as TOGGLE_OVERFLOW_SIZES } from '@hashicorp/design-system-components/components/hds/dropdown/toggle-overflow';
import { COLORS as ITEM_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item';

export default class ComponentsDropdownRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const TOGGLE_STATES = ['default', 'hover', 'active', 'focus', 'disabled'];
    const ITEM_STATES = ['default', 'hover', 'active', 'focus'];
    return {
      TOGGLE_BUTTON_COLORS,
      TOGGLE_OVERFLOW_SIZES,
      TOGGLE_STATES,
      ITEM_COLORS,
      ITEM_STATES,
    };
  }
}
