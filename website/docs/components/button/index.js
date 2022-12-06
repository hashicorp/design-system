import Component from '@glimmer/component';
import { action } from '@ember/object';

import {
  SIZES,
  COLORS,
} from '@hashicorp/design-system-components/components/hds/button';

export default class Index extends Component {
  get STATES() {
    // these are used only for presentation purpose in the showcase
    return ['default', 'hover', 'active', 'focus', 'disabled'];
  }

  get SIZES() {
    return SIZES;
  }

  get COLORS() {
    return COLORS;
  }

  @action
  copyToClipboard() {
    console.log('Clicked "Copy to clipboard" button!');
  }
}
