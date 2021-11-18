import Route from '@ember/routing/route';

import {
  LEVELS as CONTAINER_LEVELS,
  BACKGROUNDS as CONTAINER_BACKGROUNDS,
} from '@hashicorp/design-system-components/components/hds/card/container';
export default class ComponentsCardRoute extends Route {
  model() {
    return { CONTAINER_LEVELS, CONTAINER_BACKGROUNDS };
  }
}
