/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';

export default class HdsFlyoutBodyComponent extends Component {
  constructor() {
    super(...arguments);

    deprecate(
      'The `Hds::Flyout::Body` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::DialogPrimitive::Body` as one-to-one replacement.',
      false,
      {
        id: 'hds.components.flyout.body',
        until: '5.0.0',
        url: 'https://helios.hashicorp.design/components/flyout?tab=version%20history#460',
        for: '@hashicorp/design-system-components',
        since: {
          enabled: '4.6.0',
        },
      }
    );
  }
}
