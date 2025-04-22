/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';
import { on } from '@ember/modifier';

import HdsIcon from '../icon/index.gts';
import HdsTextDisplay from '../text/display.gts';
import HdsTextBody from '../text/body.gts';
import HdsDismissButton from '../dismiss-button/index.gts';

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

  <template>
    <div class="hds-flyout__header" ...attributes>
      {{#if @icon}}
        <HdsIcon class="hds-flyout__icon" @name={{@icon}} @size="24" />
      {{/if}}
      <HdsTextDisplay
        class="hds-flyout__title"
        @tag="div"
        @size="300"
        @weight="semibold"
        id={{@id}}
      >
        {{#if @tagline}}
          <HdsTextBody
            class="hds-flyout__tagline"
            @tag="div"
            @size="100"
            @weight="regular"
            @color="faint"
          >
            {{@tagline}}
          </HdsTextBody>
        {{/if}}
        {{yield}}
      </HdsTextDisplay>
      <HdsDismissButton class="hds-flyout__dismiss" {{on "click" @onDismiss}} />
    </div>
  </template>
}
