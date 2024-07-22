/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';

interface HdsFlyoutDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

export default class HdsFlyoutDescriptionComponent extends Component<HdsFlyoutDescriptionSignature> {
  constructor(owner: unknown) {
    super(owner, {});

    deprecate(
      'The `Hds::Flyout::Description` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::DialogPrimitive::Description` as one-to-one replacement.',
      false,
      {
        id: 'hds.components.flyout.description',
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
