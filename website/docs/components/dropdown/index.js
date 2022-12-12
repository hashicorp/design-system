import Component from '@glimmer/component';
import { action } from '@ember/object';

import { COLORS as TOGGLE_BUTTON_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/toggle/button';
import { COLORS as ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';

export default class Index extends Component {
  get TOGGLE_STATES() {
    // these are used only for presentation purpose in the showcase
    return ['default', 'hover', 'active', 'focus'];
  }

  get TOGGLE_BUTTON_COLORS() {
    return TOGGLE_BUTTON_COLORS;
  }

  get ITEM_STATES() {
    // these are used only for presentation purpose in the showcase
    return ['default', 'hover', 'active', 'focus'];
  }

  get ITEM_INTERACTIVE_COLORS() {
    return ITEM_INTERACTIVE_COLORS;
  }

  @action
  myAction() {
    //
  }
}
