/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionSize from 'showcase/components/page-components/modal/sub-sections/size';
import SubSectionColor from 'showcase/components/page-components/modal/sub-sections/color';
import SubSectionContent from 'showcase/components/page-components/modal/sub-sections/content';
import SubSectionDemo from 'showcase/components/page-components/modal/sub-sections/demo';

const ModalIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Modal Component"}}

  <ShwTextH1>Modal</ShwTextH1>

  <section data-test-percy>
    <SubSectionSize />
    <SubSectionColor />
    <SubSectionContent />
  </section>

  <ShwDivider />

  <section>
    <SubSectionDemo />
  </section>
</template>;

export default ModalIndex;
