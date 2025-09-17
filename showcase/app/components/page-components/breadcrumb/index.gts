/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionVariants from 'showcase/components/page-components/breadcrumb/sub-sections/variants';
import SubSectionStates from 'showcase/components/page-components/breadcrumb/sub-sections/states';
import SubSectionTruncationOptions from 'showcase/components/page-components/breadcrumb/sub-sections/truncation-options';

const BreadcrumbIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Breadcrumb Component"}}

  <ShwTextH1>Breadcrumb</ShwTextH1>

  <section data-test-percy>
    <SubSectionVariants />
    <SubSectionStates />
    <SubSectionTruncationOptions />
  </section>
</template>;

export default BreadcrumbIndex;
