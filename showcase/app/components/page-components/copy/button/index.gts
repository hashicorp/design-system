/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElements from 'showcase/components/page-components/copy/button/sub-sections/base-elements';
import SubSectionDemos from 'showcase/components/page-components/copy/button/sub-sections/demos';

const CopyButtonIndex: TemplateOnlyComponent = <template>
  {{pageTitle "CopyButton Component"}}

  <ShwTextH1>CopyButton</ShwTextH1>

  <section data-test-percy>
    <SubSectionBaseElements />
    <SubSectionDemos />
  </section>
</template>;

export default CopyButtonIndex;
