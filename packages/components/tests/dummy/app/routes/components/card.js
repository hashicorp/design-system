import Route from '@ember/routing/route';

import {
  DEFAULT_LEVEL as CONTAINER_DEFAULT_LEVEL,
  LEVELS as CONTAINER_LEVELS,
  HOVER_LEVELS as CONTAINER_HOVER_LEVELS,
  ACTIVE_LEVELS as CONTAINER_ACTIVE_LEVELS,
  BACKGROUNDS as CONTAINER_BACKGROUNDS,
} from '@hashicorp/design-system-components/components/hds/card/container';
export default class ComponentsCardRoute extends Route {
  model() {
    return {
      CONTAINER_DEFAULT_LEVEL,
      CONTAINER_LEVELS,
      CONTAINER_HOVER_LEVELS,
      CONTAINER_ACTIVE_LEVELS,
      CONTAINER_BACKGROUNDS,
    };
  }
}
