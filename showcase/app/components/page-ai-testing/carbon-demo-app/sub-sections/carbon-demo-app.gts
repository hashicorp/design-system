/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFrame from 'showcase/components/shw/frame'; // import the showframe component

const SubSectionCarbonDemoApp: TemplateOnlyComponent = <template>
  <ShwTextH2>Carbon Design System Demo</ShwTextH2>

  <ShwTextBody>
    A full application layout using Carbon Design System components, mirroring
    the Helios demo structure. This demo is displayed in an iframe to properly
    contain Carbon's fixed-position UI Shell components.
  </ShwTextBody>

  <ShwFrame
    @src="/carbon-demo-standalone.html"
    @label="Carbon Design System Demo"
    @height="780"
  />

  <ShwDivider />
</template>;

export default SubSectionCarbonDemoApp;
