/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseControl from 'showcase/components/page-components/form/radio/sub-sections/base-control';
import SubSectionFieldControl from 'showcase/components/page-components/form/radio/sub-sections/field-control';
import SubSectionGroupControl from 'showcase/components/page-components/form/radio/sub-sections/group-control';

const FormRadioIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Radio Component"}}

  <ShwTextH1>Radio</ShwTextH1>

  <section data-test-percy>
    <SubSectionBaseControl />
    <SubSectionFieldControl />
    <SubSectionGroupControl />
  </section>
</template>;

export default FormRadioIndex;
