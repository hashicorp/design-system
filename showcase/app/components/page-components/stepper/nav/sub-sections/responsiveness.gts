/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFrame from 'showcase/components/shw/frame';

const SubSectionResponsiveness: TemplateOnlyComponent = <template>
  <ShwTextH2>Responsiveness</ShwTextH2>

  <ShwFrame
    @id="demo-stepper-large-viewports"
    @src="/components/stepper/frameless/demo-responsiveness"
    @height="300"
    @label="Large viewport"
  />

  <ShwFrame
    @id="demo-stepper-small-viewports"
    @src="/components/stepper/frameless/demo-responsiveness"
    @width="400"
    @height="650"
    @label="Small viewport (< 480px)"
  />
</template>;

export default SubSectionResponsiveness;
