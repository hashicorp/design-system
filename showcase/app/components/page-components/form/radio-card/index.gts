/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseControl from 'showcase/components/page-components/form/radio-card/sub-sections/base-control';
import SubSectionGroupControl from 'showcase/components/page-components/form/radio-card/sub-sections/group-control';

const FormRadioCardIndex: TemplateOnlyComponent = <template>
  {{pageTitle "RadioCard Component"}}

  <ShwTextH1>RadioCard</ShwTextH1>

  <section data-test-percy>
    <SubSectionBaseControl />
    <SubSectionGroupControl />
  </section>
</template>;

export default FormRadioCardIndex;
