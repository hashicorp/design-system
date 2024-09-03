/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';

export interface HdsModalBodySignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsModalBody extends Component<HdsModalBodySignature> {
  constructor(owner: unknown) {
    super(owner, {});

    deprecate(
      'The `Hds::Modal::Body` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::DialogPrimitive::Body` as one-to-one replacement.',
      false,
      {
        id: 'hds.components.modal.body',
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
