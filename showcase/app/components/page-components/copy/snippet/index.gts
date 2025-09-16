/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionStates from 'showcase/components/page-components/copy/snippet/sub-sections/states';
import SubSectionContainers from 'showcase/components/page-components/copy/snippet/sub-sections/containers';
import SubSectionVariants from 'showcase/components/page-components/copy/snippet/sub-sections/variants';

const CopySnippetIndex: TemplateOnlyComponent = <template>
  {{pageTitle "CopySnippet Component"}}

  <ShwTextH1>CopySnippet</ShwTextH1>

  <section data-test-percy>
    <SubSectionVariants />
    <SubSectionStates />
    <SubSectionContainers />
  </section>
</template>;

export default CopySnippetIndex;
