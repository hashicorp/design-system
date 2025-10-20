/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionSize from 'showcase/components/page-components/flyout/sub-sections/size';
import SubSectionContent from 'showcase/components/page-components/flyout/sub-sections/content';
import SubSectionDemo from 'showcase/components/page-components/flyout/sub-sections/demo';

const FlyoutIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Flyout Component"}}

  <ShwTextH1>Flyout</ShwTextH1>

  <section data-test-percy>
    <SubSectionSize />
    <SubSectionContent />
  </section>

  <ShwDivider />

  <section>
    <SubSectionDemo />
  </section>
</template>;

export default FlyoutIndex;
