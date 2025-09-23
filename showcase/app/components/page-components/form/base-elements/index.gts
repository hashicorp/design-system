/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElements from 'showcase/components/page-components/form/base-elements/sub-sections/base-elements';
import SubSectionField from 'showcase/components/page-components/form/base-elements/sub-sections/field';
import SubSectionFieldset from 'showcase/components/page-components/form/base-elements/sub-sections/fieldset';

export default class FormBaseElementsIndex extends Component {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    {{pageTitle "BaseElements Component"}}

    <ShwTextH1>Form / Base elements</ShwTextH1>

    <section data-test-percy>
      <SubSectionBaseElements />
      <SubSectionField
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
      <SubSectionFieldset
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
    </section>
  </template>
}
