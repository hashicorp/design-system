/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionStates from 'showcase/components/page-components/copy/snippet/sub-sections/states';
import SubSectionContainers from 'showcase/components/page-components/copy/snippet/sub-sections/containers';
import SubSectionContent from 'showcase/components/page-components/copy/snippet/sub-sections/content';
import SubSectionFullWidth from 'showcase/components/page-components/copy/snippet/sub-sections/full-width';
import SubSectionColor from 'showcase/components/page-components/copy/snippet/sub-sections/color';

const CopySnippetIndex: TemplateOnlyComponent = <template>
  {{pageTitle "CopySnippet Component"}}

  <ShwTextH1>CopySnippet</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionFullWidth />
    <SubSectionColor />
    <SubSectionStates />
    <SubSectionContainers />
  </section>
</template>;

export default CopySnippetIndex;
