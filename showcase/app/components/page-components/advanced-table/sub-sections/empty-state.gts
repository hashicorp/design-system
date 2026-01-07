/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import CodeFragmentWithEmptyState from 'showcase/components/page-components/advanced-table/code-fragments/with-empty-state';

const SubSectionEmptyState: TemplateOnlyComponent = <template>
  <ShwTextH2>Empty state</ShwTextH2>

  <ShwTextH4 @tag="h3">Default</ShwTextH4>

  <CodeFragmentWithEmptyState />

  <ShwTextH4 @tag="h3">With
    <code>:emptyState</code>
    block</ShwTextH4>

  <CodeFragmentWithEmptyState @emptyState="named-block" />

  <ShwTextH4 @tag="h3">With
    <code>:emptyState</code>
    block +
    <code>ApplicationState</code>
  </ShwTextH4>

  <CodeFragmentWithEmptyState @emptyState="application-state" />

  <ShwDivider />
</template>;

export default SubSectionEmptyState;
