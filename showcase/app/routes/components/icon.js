import Route from '@ember/routing/route';

import { AVAILABLE_COLORS } from '@hashicorp/design-system-components/components/hds/icon/index';

export default class IconRoute extends Route {
  model() {
    return {
      AVAILABLE_COLORS,
    };
  }
}
