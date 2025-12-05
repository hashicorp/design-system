/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElements from 'showcase/components/page-components/stepper/list/sub-sections/base-elements';
import SubSectionExampleImplementations from 'showcase/components/page-components/stepper/list/sub-sections/example-implementations';
import SubSectionStatus from 'showcase/components/page-components/stepper/list/sub-sections/status';

const StepperListIndex: TemplateOnlyComponent = <template>
  {{pageTitle "StepperList Component"}}

  <ShwTextH1>StepperList</ShwTextH1>

  <section data-test-percy>
    <SubSectionStatus />
    <SubSectionBaseElements />
    <SubSectionExampleImplementations />
  </section>
</template>;

export default StepperListIndex;
