/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { ALIGNS } from '@hashicorp/design-system-components/components/hds/application-state/index';

import { HdsCardLevelValues as CARD_LEVELS } from '@hashicorp/design-system-components/components/hds/card/types';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsApplicationStateModel =
  ModelFrom<PageComponentsApplicationStateRoute>;

export default class PageComponentsApplicationStateRoute extends Route {
  model() {
    return {
      ALIGNS,
      CARD_LEVELS,
    };
  }
}
