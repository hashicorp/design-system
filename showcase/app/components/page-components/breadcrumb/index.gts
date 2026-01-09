/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwDivider from 'showcase/components/shw/divider';

import SubSectionVariants from 'showcase/components/page-components/breadcrumb/sub-sections/variants';
import SubSectionStates from 'showcase/components/page-components/breadcrumb/sub-sections/states';
import SubSectionTruncationOptions from 'showcase/components/page-components/breadcrumb/sub-sections/truncation-options';
import SubSectionBaseElements from 'showcase/components/page-components/breadcrumb/sub-sections/base-elements';

const BreadcrumbIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Breadcrumb Component"}}

  <ShwTextH1>Breadcrumb</ShwTextH1>

  <section data-test-percy>
    <SubSectionVariants />
    <SubSectionStates />
    <SubSectionTruncationOptions />
    <ShwDivider />
    <SubSectionBaseElements />
  </section>
</template>;

export default BreadcrumbIndex;
