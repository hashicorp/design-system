/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFrame from 'showcase/components/shw/frame';
import ShwTextBody from 'showcase/components/shw/text/body';

const SubSectionFrames: TemplateOnlyComponent = <template>
  <ShwTextH2>Responsiveness</ShwTextH2>

  <ShwFrame
    @id="demo-full-app-side-nav-large-viewports"
    @src="/components/app-side-nav/frameless/demo-responsiveness"
    @height="780"
    @label="Large viewport"
  />

  <ShwFrame
    @id="demo-full-app-side-nav-small-viewports"
    @src="/components/app-side-nav/frameless/demo-responsiveness"
    @width="800"
    @height="780"
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

  <ShwDivider />

  <ShwFrame
    @id="demo-full-app-frame-with-remove-from-dom"
    @src="/components/app-side-nav/frameless/demo-remove-from-dom"
    @height="780"
    @width="800"
    @label="Remove AppSideNav from DOM when collapse"
  />
  <ShwTextBody>
    This demo verifies that when the
    <code>AppSideNav</code>
    component is removed from the DOM while page overflow styles are overridden,
    the page's scroll functionality is properly restored.
  </ShwTextBody>

  <ShwTextBody>
    To check this, expand and then collapse the
    <code>AppSideNav</code>. Then try to scroll the page.
  </ShwTextBody>
</template>;

export default SubSectionFrames;
