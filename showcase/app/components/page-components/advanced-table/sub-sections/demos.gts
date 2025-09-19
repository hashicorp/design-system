/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFrame from 'showcase/components/shw/frame';
import ShwTextH2 from 'showcase/components/shw/text/h2';

const SubSectionDemos: TemplateOnlyComponent = <template>
  <ShwTextH2>Demo</ShwTextH2>

  <ShwFrame
    @id="demo-full-app-frame-with-advanced-table"
    @src="/layouts/app-frame/frameless/demo-full-app-frame-with-advanced-table"
    @height="780"
    @label="Advanced Table in the context of a full App Frame"
  />

  <ShwDivider />
</template>;

export default SubSectionDemos;
