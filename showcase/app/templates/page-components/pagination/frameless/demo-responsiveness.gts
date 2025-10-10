/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';

import { HdsPaginationNumbered } from '@hashicorp/design-system-components/components';

const PageComponentsPaginationFramelessDemoResponsiveness: TemplateOnlyComponent =
  <template>
    {{pageTitle "Pagination responsiveness demo - Frameless"}}

    <div {{style padding="24px"}}>
      <HdsPaginationNumbered @totalItems={{40}} />
    </div>
  </template>;

export default PageComponentsPaginationFramelessDemoResponsiveness;
