import Component from '@glimmer/component';

import {
  SIZES as BADGE_COUNT_SIZES,
  TYPES as BADGE_COUNT_TYPES,
  COLORS as BADGE_COUNT_COLORS,
} from '@hashicorp/design-system-components/components/hds/badge-count';

export default class Index extends Component {
  get BADGE_COUNT_SIZES() {
    return BADGE_COUNT_SIZES;
  }

  get BADGE_COUNT_TYPES() {
    return BADGE_COUNT_TYPES;
  }

  get BADGE_COUNT_COLORS() {
    return BADGE_COUNT_COLORS;
  }
}
