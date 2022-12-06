import Component from '@glimmer/component';

import {
  SIZES as BADGE_SIZES,
  TYPES as BADGE_TYPES,
  COLORS as BADGE_COLORS,
} from '@hashicorp/design-system-components/components/hds/badge';

export default class Index extends Component {
  get BADGE_SIZES() {
    return BADGE_SIZES;
  }

  get BADGE_TYPES() {
    return BADGE_TYPES;
  }

  get BADGE_COLORS() {
    return BADGE_COLORS;
  }
}
