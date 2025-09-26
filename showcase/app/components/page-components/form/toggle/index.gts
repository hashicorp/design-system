/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElement from 'showcase/components/page-components/form/toggle/sub-sections/base-element';
import SubSectionFieldElement from 'showcase/components/page-components/form/toggle/sub-sections/field-element';
import SubSectionGroup from 'showcase/components/page-components/form/toggle/sub-sections/group';

const FormToggleIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Toggle Component"}}

  <ShwTextH1>Toggle</ShwTextH1>

  <section data-test-percy>
    <SubSectionBaseElement />
    <SubSectionFieldElement />
    <SubSectionGroup />
  </section>
</template>;

export default FormToggleIndex;
