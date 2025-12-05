/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwDivider from 'showcase/components/shw/divider';

import SubSectionDisplay from 'showcase/components/page-components/time/sub-sections/display';
import SubSectionTooltip from 'showcase/components/page-components/time/sub-sections/tooltip';
import SubSectionDateRange from 'showcase/components/page-components/time/sub-sections/date-range';
import SubSectionInContext from 'showcase/components/page-components/time/sub-sections/in-context';

const TimeIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Time Component"}}

  <ShwTextH1>Time</ShwTextH1>

  {{! Note: The dynamic nature of the Time component triggers an infinite rendering invalidation error when attempting to test in Percy}}

  <section>
    <SubSectionTooltip />
    <SubSectionDisplay />
  </section>

  <ShwDivider />

  <section>
    <SubSectionDateRange />
  </section>

  <ShwDivider />

  <section>
    <SubSectionInContext />
  </section>
</template>;

export default TimeIndex;
