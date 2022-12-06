import Component from '@glimmer/component';
import { action } from '@ember/object';

import { TYPES } from '@hashicorp/design-system-components/components/hds/form/text-input/base';

export default class Index extends Component {
  get STATES() {
    // these are used only for presentation purpose in the showcase
    return ['default', 'hover', 'focus'];
  }

  get TYPES() {
    return TYPES;
  }

  @action
  yourOnBlurFunction() {
    console.log('Invoked "yourOnBlurFunction"');
  }
}
