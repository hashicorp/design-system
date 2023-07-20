/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { COLORS } from '@hashicorp/design-system-components/components/hds/copy/snippet';

export default class ComponentsCopySnippetRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    const STATUS = ['idle', 'success', 'error'];
    return { COLORS, STATES, STATUS };
  }
}
