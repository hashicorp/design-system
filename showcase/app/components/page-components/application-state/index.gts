/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionAlignment from 'showcase/components/page-components/application-state/sub-sections/alignment';
import SubSectionContent from 'showcase/components/page-components/application-state/sub-sections/content';
import SubSectionContainer from 'showcase/components/page-components/application-state/sub-sections/container';
import SubSectionResponsiveness from 'showcase/components/page-components/application-state/sub-sections/responsiveness';
import SubSectionWithMedia from 'showcase/components/page-components/application-state/sub-sections/with-media';

export default class ApplicationStateIndex extends Component {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    {{pageTitle "ApplicationState Component"}}

    <ShwTextH1>ApplicationState</ShwTextH1>

    <section
      data-test-percy
      class="{{if
          this.showHighlight
          'shw-component-application-state-layout-highlight'
        }}"
    >
      <SubSectionContent
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
      <SubSectionAlignment
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
      <SubSectionWithMedia
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
      <SubSectionResponsiveness
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
      <SubSectionContainer
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
    </section>
  </template>
}
