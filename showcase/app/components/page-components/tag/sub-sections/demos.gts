/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFrame from 'showcase/components/shw/frame';

const SubSectionDemos: TemplateOnlyComponent = <template>
  <ShwTextH2>Demos</ShwTextH2>

  <ShwFrame
    @id="demo-tag-performance"
    @src="/components/tag/frameless/demo-observer-performance"
    @height="300"
    @label="Performance test for ResizeObserver"
  />
</template>;

export default SubSectionDemos;
