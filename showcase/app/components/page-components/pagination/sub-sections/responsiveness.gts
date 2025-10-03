/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFrame from 'showcase/components/shw/frame';

const SubSectionResponsiveness: TemplateOnlyComponent = <template>
  <ShwTextH2>Responsiveness</ShwTextH2>

  <ShwFrame
    @id="demo-pagination-large-viewports"
    @src="/components/pagination/frameless/demo-responsiveness"
    @height="120"
    @label="Pagination::Numbered - Large viewport"
  />

  <ShwFrame
    @id="demo-pagination-small-viewports"
    @src="/components/pagination/frameless/demo-responsiveness"
    @width="800"
    @height="120"
    @label="Pagination::Numbered - Small viewport (< 1088px)"
  />
</template>;

export default SubSectionResponsiveness;
