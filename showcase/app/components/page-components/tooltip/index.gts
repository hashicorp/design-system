/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionButton from 'showcase/components/page-components/tooltip/sub-sections/button';
import SubSectionModifier from 'showcase/components/page-components/tooltip/sub-sections/modifier';

const TooltipIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Tooltip Component"}}

  <ShwTextH1>Tooltip</ShwTextH1>

  <section data-test-percy>
    <SubSectionButton />
    <SubSectionModifier />
  </section>
</template>;

export default TooltipIndex;
