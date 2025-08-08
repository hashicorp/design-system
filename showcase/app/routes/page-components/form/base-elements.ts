/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { LAYOUT_TYPES as FIELD_LAYOUT_TYPES } from '@hashicorp/design-system-components/components/hds/form/field/index';
import { LAYOUT_TYPES as FIELDSET_LAYOUT_TYPES } from '@hashicorp/design-system-components/components/hds/form/fieldset/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsFormBaseElementsModel =
  ModelFrom<PageComponentsFormBaseElementsRoute>;

export default class PageComponentsFormBaseElementsRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const SAMPLE_ERROR_MESSAGES = [
      'First error message',
      'Second error message',
    ];
    return {
      SAMPLE_ERROR_MESSAGES,
      FIELD_LAYOUT_TYPES,
      FIELDSET_LAYOUT_TYPES,
    };
  }
}
