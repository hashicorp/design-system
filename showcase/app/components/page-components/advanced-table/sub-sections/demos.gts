/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFrame from 'showcase/components/shw/frame';
import ShwTextH2 from 'showcase/components/shw/text/h2';

const SubSectionDemos: TemplateOnlyComponent = <template>
  <ShwTextH2>Demos</ShwTextH2>

  <ShwFrame
    @id="demo-full-app-frame-with-advanced-table"
    @src="/layouts/app-frame/frameless/demo-full-app-frame-with-advanced-table"
    @height="780"
    @label="AdvancedTable in the context of a full App Frame"
  />

  <ShwFrame
    @id="demo-full-app-frame-with-advanced-table-filtering"
    @src="/layouts/app-frame/frameless/demo-full-app-frame-with-advanced-table-filtering"
    @height="780"
    @label="AdvancedTable with FilterBar in the context of a full App Frame"
  />

  <ShwDivider />
</template>;

export default SubSectionDemos;
