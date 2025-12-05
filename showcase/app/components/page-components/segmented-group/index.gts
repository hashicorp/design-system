/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/segmented-group/sub-sections/content';
import SubSectionStates from 'showcase/components/page-components/segmented-group/sub-sections/states';

const SegmentedGroupIndex: TemplateOnlyComponent = <template>
  {{pageTitle "SegmentedGroup Component"}}

  <ShwTextH1>SegmentedGroup</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionStates />
  </section>
</template>;

export default SegmentedGroupIndex;
