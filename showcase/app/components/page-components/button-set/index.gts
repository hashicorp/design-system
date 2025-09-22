/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/button-set/sub-sections/content';

const ButtonSetIndex: TemplateOnlyComponent = <template>
  {{pageTitle "ButtonSet Component"}}

  <ShwTextH1>ButtonSet</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
  </section>
</template>;

export default ButtonSetIndex;
