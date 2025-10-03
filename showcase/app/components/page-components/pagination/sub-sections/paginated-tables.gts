/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';

import CodeFragmentWithNumberedAndEvents from 'showcase/components/page-components/pagination/code-fragments/with-numbered-and-events';
import CodeFragmentWithNumberedAndRouting from 'showcase/components/page-components/pagination/code-fragments/with-numbered-and-routing';
import CodeFragmentWithCompactAndEvents from 'showcase/components/page-components/pagination/code-fragments/with-compact-and-events';
import CodeFragmentWithCompactAndRouting from 'showcase/components/page-components/pagination/code-fragments/with-compact-and-routing';

import PageComponentsPaginationController from 'showcase/controllers/page-components/pagination';

interface PaginationIndexSignature {
  Args: {
    controller: PageComponentsPaginationController;
  };
}

const SubSectionPaginatedTables: TemplateOnlyComponent<PaginationIndexSignature> =
  <template>
    <ShwTextH2>Examples of paginated tables</ShwTextH2>

    <ShwTextH3>Numbered - Events-based pagination</ShwTextH3>

    <ShwTextBody>When using an "events-based" strategy, the status of the UI is
      transient, and it's not preserved across page reloads.</ShwTextBody>

    <CodeFragmentWithNumberedAndEvents />

    <ShwTextH3>Numbered - Routing-based pagination</ShwTextH3>

    <ShwTextBody>When using a "routing-based" strategy, the status of the UI is
      preserved across page reloads using the query parameters stored in the
      URL.</ShwTextBody>

    <CodeFragmentWithNumberedAndRouting
      @currentPage={{@controller.currentPageDemoNumbered}}
      @pageSize={{@controller.pageSizeDemoNumbered}}
      @sortBy={{@controller.sortByDemoNumbered}}
      @sortOrder={{@controller.sortOrderDemoNumbered}}
    />

    <ShwTextH3>Compact - Events-based pagination</ShwTextH3>

    <ShwTextBody>When using an "events-based" strategy, the status of the UI is
      transient, and it's not preserved across page reloads.</ShwTextBody>

    <CodeFragmentWithCompactAndEvents />

    {{! Notice: this demo emulates the current implementation in Cloud UI }}

    <ShwTextH3>Compact - Routing-based pagination</ShwTextH3>

    <ShwTextBody>When using a "routing-based" strategy, the status of the UI is
      preserved across page reloads using the query parameters stored in the
      URL.</ShwTextBody>

    <CodeFragmentWithCompactAndRouting
      @nextCursor={{@controller.nextCursorDemoCompact}}
      @prevCursor={{@controller.prevCursorDemoCompact}}
      @pageSize={{@controller.pageSizeDemoCompact}}
    />
  </template>;

export default SubSectionPaginatedTables;
