/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBase from 'showcase/components/page-foundations/focus-ring/sub-sections/base';
import SubSectionVariants from 'showcase/components/page-foundations/focus-ring/sub-sections/variants';

const FocusRingIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Focus ring"}}

  <ShwTextH1>Focus ring</ShwTextH1>

  <section data-test-percy>
    <SubSectionBase />
    <SubSectionVariants />
  </section>
</template>;

export default FocusRingIndex;
