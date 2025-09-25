/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContainers from 'showcase/components/page-components/button/sub-sections/containers';
import SubSectionContent from 'showcase/components/page-components/button/sub-sections/content';
import SubSectionDisplay from 'showcase/components/page-components/button/sub-sections/display';
import SubSectionGeneratedElement from 'showcase/components/page-components/button/sub-sections/generated-element';
import SubSectionStates from 'showcase/components/page-components/button/sub-sections/states';
import SubSectionVariants from 'showcase/components/page-components/button/sub-sections/variants';

const ButtonIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Button Component"}}

  <ShwTextH1>Button</ShwTextH1>

  <section data-test-percy>

    <SubSectionGeneratedElement />
    <SubSectionContent />
    <SubSectionVariants />
    <SubSectionDisplay />
    <SubSectionStates />
    <SubSectionContainers />
  </section>
</template>;

export default ButtonIndex;
