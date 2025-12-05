/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseControl from 'showcase/components/page-components/form/select/sub-sections/base-control';
import SubSectionFieldControl from 'showcase/components/page-components/form/select/sub-sections/field-control';

const FormSelectIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Select Component"}}

  <ShwTextH1>Select</ShwTextH1>

  <section data-test-percy>
    <SubSectionBaseControl />
    <SubSectionFieldControl />
  </section>
</template>;

export default FormSelectIndex;
