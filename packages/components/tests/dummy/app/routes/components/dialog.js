import Route from '@ember/routing/route';

import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/dialog';

export default class ComponentsDialogRoute extends Route {
  model() {
    return {
      COLORS,
      SIZES,
    };
  }
}
