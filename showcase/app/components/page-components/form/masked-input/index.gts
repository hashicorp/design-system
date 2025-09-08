/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElements from 'showcase/components/page-components/form/masked-input/sub-sections/base-elements';
import SubSectionFieldElement from 'showcase/components/page-components/form/masked-input/sub-sections/field-element';
import SubSectionContainers from 'showcase/components/page-components/form/masked-input/sub-sections/containers';

const FormMaskedInputIndex: TemplateOnlyComponent = <template>
  {{pageTitle "MaskedInput Component"}}

  <ShwTextH1>MaskedInput</ShwTextH1>

  <section data-test-percy>
    <SubSectionBaseElements />
    <SubSectionFieldElement />
    <SubSectionContainers />
  </section>
</template>;

export default FormMaskedInputIndex;
