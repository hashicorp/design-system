/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { pageTitle } from 'ember-page-title';
import { on } from '@ember/modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseControl from 'showcase/components/page-components/form/file-input/sub-sections/base-control';
import SubSectionFieldControl from 'showcase/components/page-components/form/file-input/sub-sections/field-control';
import SubSectionContainers from 'showcase/components/page-components/form/file-input/sub-sections/containers';

export default class FormFileInputIndex extends Component {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    {{pageTitle "FileInput Component"}}

    <ShwTextH1>FileInput</ShwTextH1>

    <section data-test-percy>
      <button
        id="dummy-toggle-highlight"
        type="button"
        {{on "click" this.toggleHighlight}}
      >
        {{if this.showHighlight "Hide" "Show"}}
        layout highlight
      </button>
      <SubSectionBaseControl @showHighlight={{this.showHighlight}} />
      <SubSectionFieldControl @showHighlight={{this.showHighlight}} />
      <SubSectionContainers @showHighlight={{this.showHighlight}} />
    </section>
  </template>
}
