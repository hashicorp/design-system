/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionVariants from 'showcase/components/page-components/text/sub-sections/variants';
import SubSectionAlignment from 'showcase/components/page-components/text/sub-sections/alignment';
import SubSectionColor from 'showcase/components/page-components/text/sub-sections/color';

const TextIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Text Component"}}

  <ShwTextH1>Text</ShwTextH1>

  <section data-test-percy>
    <SubSectionVariants />
    <SubSectionAlignment />
    <SubSectionColor />
  </section>
</template>;

export default TextIndex;
