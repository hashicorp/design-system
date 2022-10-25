import Component from '@glimmer/component';

import { COLORS } from '@hashicorp/design-system-components/components/hds/tag';

export default class HowToUse extends Component {
  get STATES() {
    // these are used only for presentation purpose in the showcase
    return ['default', 'hover', 'active', 'focus'];
  }

  get COLORS() {
    return COLORS;
  }

  get copyToClipboard() {
    return () => {
      console.log('Clicked "Copy to clipboard" button!');
    };
  }
}
