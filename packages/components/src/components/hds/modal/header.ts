/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';

export interface HdsModalHeaderSignature {
  Args: {
    id?: string;
    tagline?: string;
    onDismiss: (event: MouseEvent) => void;
    icon?: FlightIconSignature['Args']['name'] | false;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsModalHeaderComponent extends Component<HdsModalHeaderSignature> {
  constructor(owner: unknown, args: HdsModalHeaderSignature['Args']) {
    super(owner, args);

    deprecate(
      'The `Hds::Modal::Header` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::DialogPrimitive::Header` as one-to-one replacement.',
      false,
      {
        id: 'hds.components.modal.header',
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
