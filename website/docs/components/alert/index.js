import Component from '@glimmer/component';
import { action } from '@ember/object';

import {
  TYPES,
  COLORS,
} from '@hashicorp/design-system-components/components/hds/alert';

export default class Index extends Component {
  get TYPES() {
    return TYPES;
  }

  get COLORS() {
    return COLORS;
  }

  @action
  noop() {
    //
  }
}
