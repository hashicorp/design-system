/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/app-footer/sub-sections/content';
import SubSectionTheme from 'showcase/components/page-components/app-footer/sub-sections/theme';
import SubSectionLayout from 'showcase/components/page-components/app-footer/sub-sections/layout';
import SubSectionBaseElements from 'showcase/components/page-components/app-footer/sub-sections/base-elements';

export interface PageComponentsAppFooterSignature {
  Element: HTMLDivElement;
}

export default class PageComponentsAppFooter extends Component<PageComponentsAppFooterSignature> {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    {{pageTitle "AppFooter Component"}}

    <ShwTextH1>AppFooter</ShwTextH1>

    <section
      data-test-percy
      class="{{if
          this.showHighlight
          'shw-component-app-footer-layout-highlight'
        }}"
    >
      <SubSectionContent
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
      <SubSectionTheme
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
      <SubSectionLayout
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
      <SubSectionBaseElements
        @showHighlight={{this.showHighlight}}
        @toggleHighlight={{this.toggleHighlight}}
      />
    </section>
  </template>
}
