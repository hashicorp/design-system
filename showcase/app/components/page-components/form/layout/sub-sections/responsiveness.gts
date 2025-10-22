/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFrame from 'showcase/components/shw/frame';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

const SubSectionResponsiveness: TemplateOnlyComponent = <template>
  <ShwTextH2>Responsiveness</ShwTextH2>

  <ShwTextH3>Basic form</ShwTextH3>

  <ShwFrame
    @id="demo-form-layout-large-viewports"
    @src="/components/form/frameless/demo-form-basic"
    @height="850"
    @label="Large viewport - simple form"
  />

  <ShwFrame
    @id="demo-form-layout-small-viewports"
    @src="/components/form/frameless/demo-form-basic"
    @width="479"
    @height="980"
    @label="Small viewport (< 480px) - simple form"
  />

  <ShwTextH3>Complex form</ShwTextH3>

  <ShwFrame
    @id="demo-form-layout-large-viewports-complex"
    @src="/components/form/frameless/demo-form-complex"
    @height="550"
    @label="Large viewport - complex form"
  />

  <ShwFrame
    @id="demo-form-layout-small-viewports-complex"
    @src="/components/form/frameless/demo-form-complex"
    @width="479"
    @height="850"
    @label="Small viewport (< 480px) - complex form"
  />
</template>;

export default SubSectionResponsiveness;
