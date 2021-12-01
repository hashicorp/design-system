import Route from '@ember/routing/route';

import {
  SIZES,
  COLORS,
  PRODUCTS,
} from '@hashicorp/design-system-components/components/hds/icon-tile';

export default class ComponentsIconTileRoute extends Route {
  model() {
    return {
      SIZES,
      COLORS,
      PRODUCTS,
    };
  }
}
