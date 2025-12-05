/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionStepIndicator from 'showcase/components/page-components/stepper/indicator/sub-sections/step-indicator';
import SubSectionTaskIndicator from 'showcase/components/page-components/stepper/indicator/sub-sections/task-indicator';

const StepperIndicatorIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Stepper Component"}}

  <ShwTextH1>Stepper</ShwTextH1>

  <section data-test-percy>
    <SubSectionStepIndicator />
    <SubSectionTaskIndicator />
  </section>
</template>;

export default StepperIndicatorIndex;
