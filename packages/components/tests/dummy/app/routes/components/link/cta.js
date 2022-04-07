import Route from '@ember/routing/route';

import { SIZES } from '@hashicorp/design-system-components/components/hds/link/cta';

export default class ComponentsLinkCtaRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    return { SIZES, STATES };
  }
}
