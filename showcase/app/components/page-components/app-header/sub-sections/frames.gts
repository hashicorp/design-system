/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFrame from 'showcase/components/shw/frame';

const SubSectionFrames: TemplateOnlyComponent = <template>
  <ShwTextH2>Responsiveness</ShwTextH2>

  <ShwFrame
    @id="demo-app-header-large-viewports"
    @src="/components/app-header/frameless/demo-responsiveness"
    @height="400"
    @label="Large viewport"
  />

  <ShwFrame
    @id="demo-app-header-small-viewports"
    @src="/components/app-header/frameless/demo-responsiveness"
    @width="800"
    @height="400"
    @label="Small viewport (< 1088px)"
  />

  <ShwDivider />

  <ShwTextH2>Demo</ShwTextH2>

  <ShwFrame
    @id="demo-full-app-frame-with-app-header-and-app-side-nav"
    @src="/layouts/app-frame/frameless/demo-full-app-frame-with-app-header-and-app-side-nav"
    @height="780"
    @label="Full AppFrame with AppHeader & AppSideNav"
  />
  <ShwDivider />

  <ShwFrame
    @id="demo-full-app-frame-with-app-header-and-app-side-nav-small-viewport"
    @src="/layouts/app-frame/frameless/demo-full-app-frame-with-app-header-and-app-side-nav"
    @width="800"
    @height="780"
    @label="Full AppFrame with AppHeader & AppSideNav (small viewport)"
  />
</template>;

export default SubSectionFrames;
