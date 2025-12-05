/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import MockApp from 'showcase/components/mock/app';
import MockAppMainGenericFormPartialsAccountSignup from 'showcase/components/mock/app/main/generic-form/partials/account-signup';

const PageComponentsFormFramelessDemoFormBasic: TemplateOnlyComponent =
  <template>
    {{pageTitle "Basic Form Layout - Frameless"}}

    <MockApp>
      <:main>
        <MockAppMainGenericFormPartialsAccountSignup />
      </:main>
    </MockApp>
  </template>;

export default PageComponentsFormFramelessDemoFormBasic;
