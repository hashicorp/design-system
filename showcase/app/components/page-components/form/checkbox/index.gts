/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseControl from 'showcase/components/page-components/form/checkbox/sub-sections/base-control';
import SubSectionFieldControl from 'showcase/components/page-components/form/checkbox/sub-sections/field-control';
import SubSectionFieldGroup from 'showcase/components/page-components/form/checkbox/sub-sections/group-control';

const FormCheckboxIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Checkbox Component"}}

  <ShwTextH1>Checkbox</ShwTextH1>

  <section data-test-percy>
    <SubSectionBaseControl />
    <SubSectionFieldControl />
    <SubSectionFieldGroup />
  </section>
</template>;

export default FormCheckboxIndex;
