/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBasic from 'showcase/components/page-components/page-header/sub-sections/basic';
import SubSectionComplex from 'showcase/components/page-components/page-header/sub-sections/complex';
import SubSectionEdgeCases from 'showcase/components/page-components/page-header/sub-sections/edge-cases';
import SubSectionWrapping from 'showcase/components/page-components/page-header/sub-sections/wrapping';

export default class PageHeaderIndex extends Component {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    {{pageTitle "PageHeader Component"}}

    <ShwTextH1>PageHeader</ShwTextH1>

    <section
      data-test-percy
      class={{if
        this.showHighlight
        "shw-component-page-header-layout-highlight"
      }}
    >
      <button
        id="shw-component-toggle-highlight"
        type="button"
        {{on "click" this.toggleHighlight}}
      >
        {{if this.showHighlight "Hide" "Show"}}
        layout highlight
      </button>

      <SubSectionBasic />
      <SubSectionComplex />
      <SubSectionEdgeCases />
      <SubSectionWrapping />
    </section>
  </template>
}
