import Route from '@ember/routing/route';

import {
  SIZES as BADGE_COUNT_SIZES,
  TYPES as BADGE_COUNT_TYPES,
  COLORS as BADGE_COUNT_COLORS,
} from '@hashicorp/design-system-components/components/hds/badge-count';

export default class ComponentsBadgeCountRoute extends Route {
  model() {
    return {
      BADGE_COUNT_SIZES,
      BADGE_COUNT_TYPES,
      BADGE_COUNT_COLORS,
    };
  }
}
