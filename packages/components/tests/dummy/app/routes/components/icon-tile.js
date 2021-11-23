import Route from '@ember/routing/route';

import {
  SIZES as SIZES,
  COLORS as COLORS,
  LOGOS as LOGOS,
} from '@hashicorp/design-system-components/components/hds/icon-tile';

export default class ComponentsIconTileRoute extends Route {
  model() {
    return {
      SIZES,
      COLORS,
      LOGOS,
    };
  }
}
