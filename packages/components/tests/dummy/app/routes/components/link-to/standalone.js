import Route from '@ember/routing/route';
import { SIZES } from '@hashicorp/design-system-components/components/hds/link-to/standalone';

export default class ComponentsLinkToStandaloneRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'visited', 'focus', 'hover', 'active'];
    return { SIZES, STATES };
  }
}
