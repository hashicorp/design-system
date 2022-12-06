import Component from '@glimmer/component';

import { COLORS } from '@hashicorp/design-system-components/components/hds/link/inline';

export default class Index extends Component {
  get STATES() {
    // these are used only for presentation purpose in the showcase
    return ['default', 'hover', 'active', 'focus'];
  }

  get COLORS() {
    return COLORS;
  }
}
