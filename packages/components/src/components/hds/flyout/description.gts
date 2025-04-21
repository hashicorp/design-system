/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';

import HdsTextBody from '../text/body.gts';

import type Owner from '@ember/owner';
import type { HdsTextBodySignature } from '../text/body.gts';

export interface HdsFlyoutDescriptionSignature {
  Args: never;
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsFlyoutDescription extends Component<HdsFlyoutDescriptionSignature> {
  constructor(owner: Owner, args: HdsFlyoutDescriptionSignature['Args']) {
    super(owner, args);

    deprecate(
      'The `Hds::Flyout::Description` sub-component is now deprecated and will be removed in the next major version of `@hashicorp/design-system-components`. Use `Hds::DialogPrimitive::Description` as one-to-one replacement.',
      false,
      {
        id: 'hds.components.flyout.description',
        until: '5.0.0',
        url: 'https://helios.hashicorp.design/components/flyout?tab=version%20history#460',
        for: '@hashicorp/design-system-components',
        since: {
          available: '4.6.0',
          enabled: '4.6.0',
        },
      }
    );
  }

  <template>
    <HdsTextBody
      class="hds-flyout__description"
      @tag="div"
      @size="200"
      @color="primary"
      ...attributes
    >
      {{yield}}
    </HdsTextBody>
  </template>
}
