/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsBreadcrumb } from '@hashicorp/design-system-components/components';

const BreadcrumbCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Breadcrumb - Carbonization"}}

  <ShwTextH1>Breadcrumb - Carbonization</ShwTextH1>

  <section>
    {{! Content will be added here }}
  </section>
</template>;

export default BreadcrumbCarbonizationIndex;