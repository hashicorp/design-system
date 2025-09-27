/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionGeneratedElement from 'showcase/components/page-components/link/standalone/sub-sections/generated-element';
import SubSectionContent from 'showcase/components/page-components/link/standalone/sub-sections/content';
import SubSectionStates from 'showcase/components/page-components/link/standalone/sub-sections/states';

const LinkStandaloneIndex: TemplateOnlyComponent = <template>
  {{pageTitle "LinkStandalone component"}}

  <ShwTextH1>LinkStandalone</ShwTextH1>

  <section data-test-percy>
    <SubSectionGeneratedElement />
    <SubSectionContent />
    <SubSectionStates />
  </section>
</template>;

export default LinkStandaloneIndex;
