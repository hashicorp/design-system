/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import componentManifest from '@hashicorp/design-system-components/manifest/components.json';

export default class ComponentsRoute extends Route {
  model() {
    const applicationModel = this.modelFor('application');

    return {
      ...applicationModel,
      componentManifest,
    };
  }
}
