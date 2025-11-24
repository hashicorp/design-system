/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { HdsFormToggleField } from '@hashicorp/design-system-components/components';
import { on } from '@ember/modifier';
import { not } from 'ember-truth-helpers';
import { fn } from '@ember/helper';
import { service } from '@ember/service';

import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';
import type { HdsCarbonService } from '@hashicorp/design-system-components/components';

import {
  HdsIcon,
  mappedHdsIconNames,
} from '@hashicorp/design-system-components/components';

import ShwTextH1 from 'showcase/components/shw/text/h1';

type IconName = HdsIconSignature['Args']['name'];

export default class IconIndex extends Component {
  @service declare readonly hdsCarbon: HdsCarbonService;

  iconNames = mappedHdsIconNames;

  <template>
    {{pageTitle "Icon"}}

    <ShwTextH1>Icon</ShwTextH1>

    <HdsFormToggleField
      checked={{this.hdsCarbon.carbonModeEnabled}}
      {{on
        "change"
        (fn
          (mut this.hdsCarbon.carbonModeEnabled)
          (not this.hdsCarbon.carbonModeEnabled)
        )
      }}
      as |F|
    >
      <F.Label>Carbon Mode</F.Label>
    </HdsFormToggleField>

    {{! template-lint-disable no-inline-styles }}
    <section
      data-test-percy
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 16px; align-items: center;"
    >
      {{#each this.iconNames as |iconName|}}
        <HdsIcon @name={{iconName}} @size="24" />
      {{/each}}
    </section>
  </template>
}
