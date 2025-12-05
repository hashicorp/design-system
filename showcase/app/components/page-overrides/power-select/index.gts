/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionSingleSelect from 'showcase/components/page-overrides/power-select/sub-sections/single-select';
import SubSectionMultiSelect from 'showcase/components/page-overrides/power-select/sub-sections/multi-select';

const PowerSelectIndex: TemplateOnlyComponent = <template>
  {{pageTitle "PowerSelect Component"}}

  <ShwTextH1>PowerSelect</ShwTextH1>

  <section data-test-percy>
    <SubSectionSingleSelect />
    <SubSectionMultiSelect />
  </section>
</template>;

export default PowerSelectIndex;
