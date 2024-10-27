/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';

export interface HdsFlyoutFooterSignature {
  Args: {
    onDismiss?: (event: MouseEvent) => void;
  };
  Blocks: {
    default: [{ close?: (event: MouseEvent) => void }];
  };
  Element: HTMLDivElement;
}

export default class HdsFlyoutFooter extends Component<HdsFlyoutFooterSignature> {
  constructor(owner: unknown, args: HdsFlyoutFooterSignature['Args']) {
    super(owner, args);

    deprecate(
      'The `Hds::Flyout::Footer` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::DialogPrimitive::Footer` as one-to-one replacement.',
      false,
      {
        id: 'hds.components.flyout.footer',
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
