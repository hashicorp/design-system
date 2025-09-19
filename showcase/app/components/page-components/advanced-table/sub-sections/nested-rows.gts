/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import POLICIES from 'showcase/mocks/policy-data';

import CodeFragmentWithNestedRows from 'showcase/components/page-components/advanced-table/code-fragments/with-nested-rows';

const POLICIES_WITH_CUSTOM_KEY = POLICIES.map((policy) => {
  const { children, ...rest } = policy;
  return {
    ...rest,
    isOpen: false,
    data: children,
  };
});

const SubSectionNestedRows: TemplateOnlyComponent = <template>
  <ShwTextH2>Nested rows</ShwTextH2>

  <ShwTextH3>With default expanded rows</ShwTextH3>
  <CodeFragmentWithNestedRows @model={{POLICIES}} />

  <ShwTextH3>With nested rows and custom children key</ShwTextH3>
  <CodeFragmentWithNestedRows
    @model={{POLICIES_WITH_CUSTOM_KEY}}
    @childrenKey="data"
  />

  <ShwDivider />
</template>;

export default SubSectionNestedRows;
