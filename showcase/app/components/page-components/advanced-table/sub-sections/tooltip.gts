/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';

import CodeFragmentWithSimpleData from 'showcase/components/page-components/advanced-table/code-fragments/with-simple-data';

const SubSectionNestedRows: TemplateOnlyComponent = <template>
  <ShwTextH2>Tooltip</ShwTextH2>
  <CodeFragmentWithSimpleData @hasTooltips={{true}} />

  <ShwDivider />
</template>;

export default SubSectionNestedRows;
