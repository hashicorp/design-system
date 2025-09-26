/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionCharacterCount from 'showcase/components/page-components/form/base-elements/sub-sections/character-count';
import SubSectionError from 'showcase/components/page-components/form/base-elements/sub-sections/error';
import SubSectionField from 'showcase/components/page-components/form/base-elements/sub-sections/field';
import SubSectionFieldset from 'showcase/components/page-components/form/base-elements/sub-sections/fieldset';
import SubSectionHelperText from 'showcase/components/page-components/form/base-elements/sub-sections/helper-text';
import SubSectionIndicator from 'showcase/components/page-components/form/base-elements/sub-sections/indicator';
import SubSectionLabel from 'showcase/components/page-components/form/base-elements/sub-sections/label';
import SubSectionLegend from 'showcase/components/page-components/form/base-elements/sub-sections/legend';
import SubSectionVisibilityToggle from 'showcase/components/page-components/form/base-elements/sub-sections/visibility-toggle';

export default class FormBaseElementsIndex extends Component {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    {{pageTitle "BaseElements Component"}}

    <ShwTextH1>Form / Base elements</ShwTextH1>

    <section data-test-percy>
      <SubSectionLabel />
      <SubSectionHelperText />
      <SubSectionIndicator />
      <SubSectionCharacterCount />
      <SubSectionError />
      <SubSectionLegend />
      <SubSectionField
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
      <SubSectionFieldset
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
      <SubSectionVisibilityToggle />
    </section>
  </template>
}
