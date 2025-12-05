/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElement from 'showcase/components/page-components/form/textarea/sub-sections/base-element';
import SubSectionFieldElement from 'showcase/components/page-components/form/textarea/sub-sections/field-element';

const FormTextareaIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Textarea Component"}}

  <ShwTextH1>Textarea</ShwTextH1>

  <section data-test-percy>
    <SubSectionBaseElement />
    <SubSectionFieldElement />
  </section>
</template>;

export default FormTextareaIndex;
