/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionWrapper from 'showcase/components/page-utilities/dialog-primitive/sub-sections/wrapper';
import SubSectionBaseElements from 'showcase/components/page-utilities/dialog-primitive/sub-sections/base-elements';

const DialogPrimitiveIndex: TemplateOnlyComponent = <template>
  {{pageTitle "DialogPrimitive Component"}}

  <ShwTextH1>DialogPrimitive</ShwTextH1>

  <section data-test-percy>
    <SubSectionWrapper />
    <SubSectionBaseElements />
  </section>
</template>;

export default DialogPrimitiveIndex;
