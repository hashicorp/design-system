/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwDivider from 'showcase/components/shw/divider';

import SubSectionWidthManagement from './sub-sections/width-management';
import SubSectionAlign from './sub-sections/align';
import SubSectionGap from './sub-sections/gap';
import SubSectionBaseElements from './sub-sections/base-elements';
import SubSectionExamples from './sub-sections/examples';

const GridIndex: TemplateOnlyComponent = <template>
  {{pageTitle "LayoutGrid Component"}}

  <ShwTextH1>LayoutGrid</ShwTextH1>

  <section data-test-percy>
    <SubSectionWidthManagement />
    <SubSectionAlign />
    <SubSectionGap />
  </section>

  <ShwDivider />

  <section data-test-percy>
    <SubSectionBaseElements />
  </section>

  <ShwDivider />

  <section data-test-percy>
    <SubSectionExamples />
  </section>
</template>;

export default GridIndex;
