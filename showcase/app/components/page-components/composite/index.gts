/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBasic from 'showcase/components/page-components/composite/sub-sections/basic';
import SubSectionOrientation from 'showcase/components/page-components/composite/sub-sections/orientation';
import SubSectionLoop from 'showcase/components/page-components/composite/sub-sections/loop';
import SubSectionDisabledItems from 'showcase/components/page-components/composite/sub-sections/disabled-items';
import SubSectionGrid from 'showcase/components/page-components/composite/sub-sections/grid';
import SubSectionWrap from 'showcase/components/page-components/composite/sub-sections/wrap';
import SubSectionDefaultCurrentId from 'showcase/components/page-components/composite/sub-sections/default-current-id';

const CompositeIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Composite Component"}}

  <ShwTextH1>Composite</ShwTextH1>

  <section data-test-percy>
    <SubSectionBasic />
    <SubSectionOrientation />
    <SubSectionLoop />
    <SubSectionDisabledItems />
    <SubSectionGrid />
    <SubSectionWrap />
    <SubSectionDefaultCurrentId />
  </section>
</template>;

export default CompositeIndex;
