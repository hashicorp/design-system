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

import {
  HdsCardLevelValues as CONTAINER_LEVEL_VALUES,
  HdsCardOverflowValues as CONTAINER_OVERFLOW_VALUES,
} from '@hashicorp/design-system-components/components/hds/card/types';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentCardModel = ModelFrom<PageComponentsCardRoute>;

export default class PageComponentsCardRoute extends Route {
  model() {
    return {
      CONTAINER_DEFAULT_LEVEL,
      CONTAINER_LEVELS,
      CONTAINER_BACKGROUNDS,
      CONTAINER_LEVEL_VALUES,
      CONTAINER_OVERFLOW_VALUES,
    };
  }
}
