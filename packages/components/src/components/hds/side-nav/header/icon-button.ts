/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert, deprecate } from '@ember/debug';

import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive/';

interface HdsSideNavHeaderIconButtonSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon: HdsIconSignature['Args']['name'];
    ariaLabel: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsSideNavHeaderIconButtonComponent extends Component<HdsSideNavHeaderIconButtonSignature> {
  constructor(
    owner: unknown,
    args: HdsSideNavHeaderIconButtonSignature['Args']
  ) {
    super(owner, args);

    deprecate(
      'The `Hds::SideNav::Header::IconButton` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::Button` as one-to-one replacement.',
      false,
      {
        id: 'hds.components.sidenav.header.iconbutton',
        until: '5.0.0', // TODO: Confirm version
        url: 'https://helios.hashicorp.design/components/side-nav?tab=version%20history#480', // TODO: Confirm URL
        for: '@hashicorp/design-system-components',
        since: {
          enabled: '4.9.0', // TODO: Confirm version
        },
      }
    );
  }

  get ariaLabel(): string {
    const { ariaLabel } = this.args;

    assert(
      '@ariaLabel for "Hds::SideNav::Header::IconButton" must have a valid value',
      ariaLabel !== undefined
    );

    return ariaLabel;
  }
}
