import Component from '@glimmer/component';

import {
  DEFAULT_LEVEL as CONTAINER_DEFAULT_LEVEL,
  LEVELS as CONTAINER_LEVELS,
  BACKGROUNDS as CONTAINER_BACKGROUNDS,
} from '@hashicorp/design-system-components/components/hds/card/container';

export default class Index extends Component {
  get CONTAINER_DEFAULT_LEVEL() {
    return CONTAINER_DEFAULT_LEVEL;
  }

  get CONTAINER_LEVELS() {
    return CONTAINER_LEVELS;
  }

  get CONTAINER_BACKGROUNDS() {
    return CONTAINER_BACKGROUNDS;
  }
}
