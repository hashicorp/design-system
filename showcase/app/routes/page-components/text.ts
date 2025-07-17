/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  SIZES as DISPLAY_SIZES,
  WEIGHTS_PER_SIZE as DISPLAY_WEIGHTS_PER_SIZE,
} from '@hashicorp/design-system-components/components/hds/text/display';
import {
  SIZES as BODY_SIZES,
  WEIGHTS_PER_SIZE as BODY_WEIGHTS_PER_SIZE,
} from '@hashicorp/design-system-components/components/hds/text/body';
import {
  SIZES as CODE_SIZES,
  WEIGHTS_PER_SIZE as CODE_WEIGHTS_PER_SIZE,
} from '@hashicorp/design-system-components/components/hds/text/code';
import {
  ALIGNS,
  COLORS,
} from '@hashicorp/design-system-components/components/hds/text/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsTextModel = ModelFrom<PageComponentsTextRoute>;

export default class PageComponentsTextRoute extends Route {
  model() {
    return {
      DISPLAY_SIZES,
      DISPLAY_WEIGHTS_PER_SIZE,
      BODY_SIZES,
      BODY_WEIGHTS_PER_SIZE,
      CODE_SIZES,
      CODE_WEIGHTS_PER_SIZE,
      ALIGNS,
      COLORS,
    };
  }
}
