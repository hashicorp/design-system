/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElements from 'showcase/components/page-components/tabs/sub-sections/base-elements';
import SubSectionSizes from 'showcase/components/page-components/tabs/sub-sections/sizes';
import SubSectionVariants from 'showcase/components/page-components/tabs/sub-sections/variants';
import SubSectionDemos from 'showcase/components/page-components/tabs/sub-sections/demos';

import PageComponentsTabsController from 'showcase/controllers/page-components/tabs';

interface TabsIndexSignature {
  Args: {
    controller: PageComponentsTabsController;
  };
}

export default class TabsIndex extends Component<TabsIndexSignature> {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    {{pageTitle "Tabs Component"}}

    <ShwTextH1>Tabs</ShwTextH1>

    <section
      data-test-percy
      class={{if this.showHighlight "shw-component-tabs-layout-highlight"}}
    >

      <button
        id="shw-component-toggle-highlight"
        type="button"
        {{on "click" this.toggleHighlight}}
      >
        {{if this.showHighlight "Hide" "Show"}}
        layout highlight
      </button>

      <SubSectionSizes />
      <SubSectionVariants />
      <SubSectionBaseElements />
      <SubSectionDemos @controller={{@controller}} />
    </section>
  </template>
}
