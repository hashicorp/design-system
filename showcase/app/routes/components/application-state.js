/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { ALIGNS } from '@hashicorp/design-system-components/components/hds/application-state';

export default class ComponentsApplicationStateRoute extends Route {
  model() {
    return {
      ALIGNS,
    };
  }
}
