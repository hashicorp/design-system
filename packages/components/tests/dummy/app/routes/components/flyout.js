import Route from '@ember/routing/route';

import { SIZES } from '@hashicorp/design-system-components/components/hds/flyout';

export default class ComponentsFlyoutRoute extends Route {
  model() {
    return {
      SIZES,
    };
  }
}
