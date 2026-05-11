/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import MockApp from 'showcase/components/mock/app';

const PageLayoutsAppFrameFramelessDemoFullAppFrameWithAdvancedTable: TemplateOnlyComponent =
  <template>
    {{pageTitle "AppFrame Component - Frameless"}}

    <MockApp>
      <:main as |M|>
        <M.PageHeader />
        <M.GenericAdvancedTable />
      </:main>
    </MockApp>
  </template>;

export default PageLayoutsAppFrameFramelessDemoFullAppFrameWithAdvancedTable;
