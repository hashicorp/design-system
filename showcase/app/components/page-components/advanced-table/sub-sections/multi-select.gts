/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import CodeFragmentWithMultiSelect from 'showcase/components/page-components/advanced-table/code-fragments/with-multi-select';

const SubSectionMultiSelect: TemplateOnlyComponent = <template>
  <ShwTextH2>Multi-select</ShwTextH2>

  <CodeFragmentWithMultiSelect
    @columns={{array
      (hash key="lorem" label="Row #")
      (hash key="ipsum" label="Ipsum")
      (hash key="dolor" label="Dolor")
    }}
  />

  <ShwTextH4 @tag="h3">Sortable table with sorting by selected item</ShwTextH4>
  <CodeFragmentWithMultiSelect
    @columns={{array
      (hash key="lorem" label="Row #" isSortable=true)
      (hash key="ipsum" label="Ipsum")
      (hash key="dolor" label="Dolor")
    }}
    @hasSortBySelected={{true}}
    @selectableColumnKey="isSelected"
  />

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionMultiSelect;
