/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionVariants from 'showcase/components/page-components/separator/sub-sections/variants';

const SeparatorIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Separator Component"}}

  <ShwTextH1>Separator</ShwTextH1>

  <section data-test-percy>
    <SubSectionVariants />
  </section>
</template>;

export default SeparatorIndex;
