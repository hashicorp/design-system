/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFrame from 'showcase/components/shw/frame';
import ShwTextH2 from 'showcase/components/shw/text/h2';

const SubSectionResponsiveness: TemplateOnlyComponent = <template>
  <ShwTextH2>Responsiveness</ShwTextH2>

  <ShwFrame
    @id="demo-key-value-inputs-large-viewports"
    @src="/components/form/key-value-inputs/frameless/demo-responsiveness"
    @height="300"
    @label="Large viewport"
  />

  <ShwFrame
    @id="demo-key-value-inputs-small-viewports"
    @src="/components/form/key-value-inputs/frameless/demo-responsiveness"
    @width="400"
    @height="650"
    @label="Small viewport (< 480px)"
  />

  <ShwDivider @level={{2}} />

  <ShwFrame
    @id="demo-key-value-inputs-custom-widths-large-viewports"
    @src="/components/form/key-value-inputs/frameless/demo-responsiveness-custom-widths"
    @height="300"
    @label="Custom widths + large viewport"
  />

  <ShwFrame
    @id="demo-key-value-inputs-custom-widths-small-viewports"
    @src="/components/form/key-value-inputs/frameless/demo-responsiveness-custom-widths"
    @width="400"
    @height="650"
    @label="Custom widths + small viewport (< 480px)"
  />

  <ShwDivider @level={{2}} />

  <ShwFrame
    @id="demo-key-value-inputs-within-form-large-viewports"
    @src="/components/form/key-value-inputs/frameless/demo-in-form"
    @height="600"
    @label="With other responsive components"
  />

  <ShwFrame
    @id="demo-key-value-inputs-within-form-small-viewports"
    @src="/components/form/key-value-inputs/frameless/demo-in-form"
    @width="400"
    @height="650"
    @label="With other responsive components"
  />
</template>;

export default SubSectionResponsiveness;
