/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';
import type { HdsIconSignature } from '../icon';
import type Owner from '@ember/owner';

export interface HdsFlyoutHeaderSignature {
  Args: {
    id?: string;
    tagline?: string;
    onDismiss: (event: MouseEvent) => void;
    icon?: HdsIconSignature['Args']['name'];
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFlyoutHeader extends Component<HdsFlyoutHeaderSignature> {
  constructor(owner: Owner, args: HdsFlyoutHeaderSignature['Args']) {
    super(owner, args);

    deprecate(
      'The `Hds::Flyout::Header` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::DialogPrimitive::Header` as one-to-one replacement.',
      false,
      {
        id: 'hds.components.flyout.header',
        until: '5.0.0',
        url: 'https://helios.hashicorp.design/components/flyout?tab=version%20history#460',
        for: '@hashicorp/design-system-components',
        since: {
          enabled: '4.6.0',
          available: '4.6.0',
        },
      }
    );
  }
}
