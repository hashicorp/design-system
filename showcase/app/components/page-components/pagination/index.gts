/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwDivider from 'showcase/components/shw/divider';

import SubSectionBaseElements from 'showcase/components/page-components/pagination/sub-sections/base-elements';
import SubSectionNumbered from 'showcase/components/page-components/pagination/sub-sections/numbered';
import SubSectionCompact from 'showcase/components/page-components/pagination/sub-sections/compact';
import SubSectionResponsiveness from 'showcase/components/page-components/pagination/sub-sections/responsiveness';
import SubSectionPaginatedTables from 'showcase/components/page-components/pagination/sub-sections/paginated-tables';

import PageComponentsPaginationController from 'showcase/controllers/page-components/pagination';

interface PaginationIndexSignature {
  Args: {
    controller: PageComponentsPaginationController;
  };
}

export default class PaginationIndex extends Component<PaginationIndexSignature> {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    {{pageTitle "Pagination Component"}}

    <ShwTextH1>Pagination</ShwTextH1>

    <section
      data-test-percy
      class="{{if
          this.showHighlight
          'shw-component-pagination-layout-highlight'
        }}"
    >

      <button
        id="dummy-toggle-highlight"
        type="button"
        {{on "click" this.toggleHighlight}}
      >
        {{if this.showHighlight "Hide" "Show"}}
        layout highlight
      </button>

      <SubSectionNumbered />
      <SubSectionCompact />
      <SubSectionBaseElements />
      <SubSectionPaginatedTables @controller={{@controller}} />
    </section>

    <ShwDivider />

    {{! For some reason, Ember tests don't play well with iframes (URL not found) so we can't take snapshots of these examples in Percy }}
    <section>
      <SubSectionResponsiveness />
    </section>
  </template>
}
