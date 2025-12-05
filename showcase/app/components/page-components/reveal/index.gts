/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/reveal/sub-sections/content';
import SubSectionStates from 'showcase/components/page-components/reveal/sub-sections/states';
import SubSectionOptions from 'showcase/components/page-components/reveal/sub-sections/options';

const RevealIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Reveal Component"}}

  <ShwTextH1>Reveal</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionStates />
    <SubSectionOptions />
  </section>
</template>;

export default RevealIndex;
