/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { pageTitle } from 'ember-page-title';
import { on } from '@ember/modifier';

import { HdsFormToggleField } from '@hashicorp/design-system-components/components';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionSize from 'showcase/components/page-components/icon/sub-sections/size';
import SubSectionColor from 'showcase/components/page-components/icon/sub-sections/color';
import SubSectionDisplay from 'showcase/components/page-components/icon/sub-sections/display';

import type HdsCarbonService from '@hashicorp/design-system-components/services/hds-carbon';

export default class IconIndex extends Component {
  @service declare readonly hdsCarbon: HdsCarbonService;

  toggleCarbonMode = () => {
    this.hdsCarbon.toggleCarbonMode();
  };

  <template>
    {{pageTitle "Icon Component"}}

    <ShwTextH1>Icon</ShwTextH1>
  
    <HdsFormToggleField
      {{on "change" this.toggleCarbonMode}}
      as |F|
    >
      <F.Label>Enable Carbon theme</F.Label>
    </HdsFormToggleField>

    <section data-test-percy>
      <SubSectionSize />
      <SubSectionColor />
      <SubSectionDisplay />
    </section>
  </template>
};
