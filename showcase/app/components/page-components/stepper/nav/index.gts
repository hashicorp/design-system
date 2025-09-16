/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElements from 'showcase/components/page-components/stepper/nav/sub-sections/base-elements';
import SubSectionExamples from 'showcase/components/page-components/stepper/nav/sub-sections/examples';
import SubSectionInteractivity from 'showcase/components/page-components/stepper/nav/sub-sections/interactivity';
import SubSectionResponsiveness from 'showcase/components/page-components/stepper/nav/sub-sections/responsiveness';

const StepperNavIndex: TemplateOnlyComponent = <template>
  {{pageTitle "StepperNav Component"}}

  <ShwTextH1>StepperNav</ShwTextH1>

  <section data-test-percy>
    <SubSectionInteractivity />
    <SubSectionBaseElements />
    <SubSectionExamples />
  </section>
  {{! For some reason, Ember tests don't play well with iframes (URL not found) so we can't take snapshots of these examples in Percy }}
  <section>
    <SubSectionResponsiveness />
  </section>
</template>;

export default StepperNavIndex;
