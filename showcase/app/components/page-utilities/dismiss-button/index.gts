/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionStates from 'showcase/components/page-utilities/dismiss-button/sub-sections/states';

const DismissButtonIndex: TemplateOnlyComponent = <template>
  {{pageTitle "DismissButton Component"}}

  <ShwTextH1>DismissButton</ShwTextH1>

  <section data-test-percy>
    <SubSectionStates />
  </section>
</template>;

export default DismissButtonIndex;
