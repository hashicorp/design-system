import Route from '@ember/routing/route';

import { SIZES } from '@hashicorp/design-system-components/components/hds/cta';

export default class ComponentsButtonRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];
    return { SIZES, STATES };
  }
}
