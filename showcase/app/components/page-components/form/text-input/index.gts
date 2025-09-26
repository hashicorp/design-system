/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElement from 'showcase/components/page-components/form/text-input/sub-sections/base-element';
import SubSectionFieldElement from 'showcase/components/page-components/form/text-input/sub-sections/field-element';

const FormTextInputIndex: TemplateOnlyComponent = <template>
  {{pageTitle "TextInput Component"}}

  <ShwTextH1>TextInput</ShwTextH1>

  <section data-test-percy>
    <SubSectionBaseElement />
    <SubSectionFieldElement />
  </section>
</template>;

export default FormTextInputIndex;
