/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionSize from 'showcase/components/page-components/icon/sub-sections/size';
import SubSectionColor from 'showcase/components/page-components/icon/sub-sections/color';
import SubSectionDisplay from 'showcase/components/page-components/icon/sub-sections/display';

const IconIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Icon Component"}}

  <ShwTextH1>Icon</ShwTextH1>

  <section data-test-percy>
    <SubSectionSize />
    <SubSectionColor />
    <SubSectionDisplay />
  </section>
</template>;

export default IconIndex;
