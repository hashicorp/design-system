/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';

export interface HdsModalBodySignature {
  // when component has no args, but constructor still needs to be defined, use `never`
  // see: https://github.com/hashicorp/design-system/pull/2511/files/f2146e5243d0431892a62d2fbf2889f1cbd3e525#r1815255004
  Args: never;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsModalBody extends Component<HdsModalBodySignature> {
  constructor(owner: unknown, args: HdsModalBodySignature['Args']) {
    super(owner, args);

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
