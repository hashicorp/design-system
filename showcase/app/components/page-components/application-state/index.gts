/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionAlignment from 'showcase/components/page-components/application-state/sub-sections/alignment';
import SubSectionContent from 'showcase/components/page-components/application-state/sub-sections/content';
import SubSectionContainer from 'showcase/components/page-components/application-state/sub-sections/container';
import SubSectionResponsiveness from 'showcase/components/page-components/application-state/sub-sections/responsiveness';
import SubSectionWithMedia from 'showcase/components/page-components/application-state/sub-sections/with-media';

export default class ApplicationStateIndex extends Component {
  @tracked showHighlight = false;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  <template>
    {{pageTitle "ApplicationState Component"}}

    <ShwTextH1>ApplicationState</ShwTextH1>

    <button
      type="button"
      class="shw-component-application-state-button-highlight"
      {{on "click" this.toggleHighlight}}
    >
      {{if this.showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <section
      data-test-percy
      class="{{if
          this.showHighlight
          'shw-component-application-state-layout-highlight'
        }}"
    >
      <SubSectionContent />
      <SubSectionAlignment />
      <SubSectionWithMedia />
      <SubSectionResponsiveness />
      <SubSectionContainer />
    </section>
  </template>
}
