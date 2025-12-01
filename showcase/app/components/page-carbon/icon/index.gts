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

import type { HdsCarbonService } from '@hashicorp/design-system-components/components';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import ShwTextH1 from 'showcase/components/shw/text/h1';

export default class IconIndex extends Component {
  @service declare readonly hdsCarbon: HdsCarbonService;

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
      <HdsIcon @name="accessibility" @size="24" />
    </section>
  </template>
}
