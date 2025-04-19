/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert, deprecate } from '@ember/debug';

import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive/index.gts';
import type Owner from '@ember/owner';

export interface HdsSideNavHeaderIconButtonSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon: HdsIconSignature['Args']['name'];
    ariaLabel: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsSideNavHeaderIconButton extends Component<HdsSideNavHeaderIconButtonSignature> {
  constructor(owner: Owner, args: HdsSideNavHeaderIconButtonSignature['Args']) {
    super(owner, args);

    deprecate(
      'The `Hds::SideNav::Header::IconButton` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::Button` with the `isIconOnly` variant instead.',
      false,
      {
        id: 'hds.components.sidenav.header.iconbutton',
        until: '5.0.0',
        url: 'https://helios.hashicorp.design/components/side-nav?tab=version%20history#4100',
        for: '@hashicorp/design-system-components',
        since: {
          available: '4.10.0',
          enabled: '4.10.0',
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
