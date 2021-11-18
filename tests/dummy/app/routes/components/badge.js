import Route from '@ember/routing/route';

import {
  SIZES as BADGE_SIZES,
  TYPES as BADGE_TYPES,
  COLORS as BADGE_COLORS,
} from '@hashicorp/design-system-components/components/hds/badge/consts';

import {
  SIZES as BADGE_COUNT_SIZES,
  TYPES as BADGE_COUNT_TYPES,
  COLORS as BADGE_COUNT_COLORS,
} from '@hashicorp/design-system-components/components/hds/badge-count/consts';

export default class ComponentsBadgeRoute extends Route {
  model() {
    return {
      BADGE_SIZES,
      BADGE_TYPES,
      BADGE_COLORS,
      BADGE_COUNT_SIZES,
      BADGE_COUNT_TYPES,
      BADGE_COUNT_COLORS,
    };
  }
}
