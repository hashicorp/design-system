/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionGeneratedElement from 'showcase/components/page-components/link/inline/sub-sections/generated-element';
import SubSectionContent from 'showcase/components/page-components/link/inline/sub-sections/content';
import SubSectionStates from 'showcase/components/page-components/link/inline/sub-sections/states';

const LinkInlineIndex: TemplateOnlyComponent = <template>
  {{pageTitle "LinkInline component"}}

  <ShwTextH1>LinkInline</ShwTextH1>

  <section data-test-percy>
    <SubSectionGeneratedElement />
    <SubSectionContent />
    <SubSectionStates />
  </section>
</template>;

export default LinkInlineIndex;
