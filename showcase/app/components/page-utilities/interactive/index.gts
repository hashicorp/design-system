/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionElements from 'showcase/components/page-utilities/interactive/sub-section/elements';

const InteractiveIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Interactive Component"}}

  <ShwTextH1>Interactive</ShwTextH1>

  <section data-test-percy>
    <SubSectionElements />
  </section>
</template>;

export default InteractiveIndex;
