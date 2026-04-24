/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionInteractive from './sub-sections/interactive';
import SubSectionVariants from './sub-sections/variants';

const CdsModalIndex: TemplateOnlyComponent = <template>
  {{pageTitle "CdsModal Component"}}

  <ShwTextH1>CdsModal</ShwTextH1>

  <section data-test-percy>
    <SubSectionVariants />
  </section>

  <SubSectionInteractive />
</template>;

export default CdsModalIndex;
