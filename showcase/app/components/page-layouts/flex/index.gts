/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionDirection from 'showcase/components/page-layouts/flex/sub-sections/direction';
import SubSectionWrap from 'showcase/components/page-layouts/flex/sub-sections/wrap';
import SubSectionJustifyAlign from 'showcase/components/page-layouts/flex/sub-sections/justify-align';
import SubSectionGap from 'showcase/components/page-layouts/flex/sub-sections/gap';
import SubSectionDisplay from 'showcase/components/page-layouts/flex/sub-sections/display';
import SubSectionBaseElements from 'showcase/components/page-layouts/flex/sub-sections/base-elements';
import SubSectionExamples from 'showcase/components/page-layouts/flex/sub-sections/examples';

const FlexIndex: TemplateOnlyComponent = <template>
  {{pageTitle "LayoutFlex Component"}}

  <ShwTextH1>LayoutFlex</ShwTextH1>

  <section data-test-percy>
    <SubSectionDirection />
    <SubSectionWrap />
    <SubSectionJustifyAlign />
    <SubSectionGap />
    <SubSectionDisplay />
    <SubSectionBaseElements />
    <SubSectionExamples />
  </section>
</template>;

export default FlexIndex;
