/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { array } from '@ember/helper';
import style from 'ember-style-modifier/modifiers/style';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

// HDS components
import { HdsPaginationNumbered } from '@hashicorp/design-system-components/components';

// types
import type { HdsPaginationNumberedSignature } from '@hashicorp/design-system-components/components/hds/pagination/numbered/index';

export interface MockAppMainPaginationSignature {
  Element: HdsPaginationNumberedSignature['Element'];
}

const MockAppMainPagination: TemplateOnlyComponent<MockAppMainPaginationSignature> =
  <template>
    <HdsPaginationNumbered
      @totalItems={{39}}
      @currentPageSize={{10}}
      @pageSizes={{array 5 10 30}}
      {{style margin-top="16px"}}
      ...attributes
    />
  </template>;
export default MockAppMainPagination;
