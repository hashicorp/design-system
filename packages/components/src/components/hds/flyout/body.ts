/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';

import type Owner from '@ember/owner';

export interface HdsFlyoutBodySignature {
  // when component has no args, but constructor still needs to be defined, use `never`
  // see: https://github.com/hashicorp/design-system/pull/2511/files/f2146e5243d0431892a62d2fbf2889f1cbd3e525#r1815255004
  Args: never;
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFlyoutBody extends Component<HdsFlyoutBodySignature> {
  constructor(owner: Owner, args: HdsFlyoutBodySignature['Args']) {
    super(owner, args);

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
          available: '4.6.0',
        },
      }
    );
  }
}
