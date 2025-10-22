/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { tracked } from '@glimmer/tracking';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContainers from 'showcase/components/page-components/form/layout/sub-sections/containers';
import SubSectionContent from 'showcase/components/page-components/form/layout/sub-sections/content';
import SubSectionComponents from 'showcase/components/page-components/form/layout/sub-sections/components';
import SubSectionResponsiveness from 'showcase/components/page-components/form/layout/sub-sections/responsiveness';
import SubSectionExamples from 'showcase/components/page-components/form/layout/sub-sections/examples';
import SubSectionWithinContainers from 'showcase/components/page-components/form/layout/sub-sections/within-containers';

export default class FormLayoutIndex extends Component {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    {{pageTitle "Form Component"}}

    <ShwTextH1>Form / Layout components</ShwTextH1>

    <section data-test-percy>
      <SubSectionContainers
        @toggleHighlight={{this.toggleHighlight}}
        @showHighlight={{this.showHighlight}}
      />

      <SubSectionContent
        @toggleHighlight={{this.toggleHighlight}}
        @showHighlight={{this.showHighlight}}
      />

      <SubSectionComponents
        @toggleHighlight={{this.toggleHighlight}}
        @showHighlight={{this.showHighlight}}
      />

    </section>

    <ShwDivider />

    <section class="shw-component-form-layout-examples-wrapper" data-test-percy>
      <SubSectionExamples />
    </section>

    <ShwDivider />

    <section>
      <SubSectionWithinContainers />
    </section>

    <ShwDivider />

    {{! For some reason, Ember tests don't play well with iframes (URL not found) so we can't take snapshots of these examples in Percy }}
    <section>
      <SubSectionResponsiveness />
    </section>
  </template>
}
