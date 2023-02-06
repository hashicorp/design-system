/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  DEFAULT_LEVEL as CONTAINER_DEFAULT_LEVEL,
  LEVELS as CONTAINER_LEVELS,
  BACKGROUNDS as CONTAINER_BACKGROUNDS,
} from '@hashicorp/design-system-components/components/hds/card/container';
export default class ComponentsCardRoute extends Route {
  model() {
    return {
      CONTAINER_DEFAULT_LEVEL,
      CONTAINER_LEVELS,
      CONTAINER_BACKGROUNDS,
    };
  }
}
