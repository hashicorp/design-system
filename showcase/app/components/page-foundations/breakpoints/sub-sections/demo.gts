/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFrame from 'showcase/components/shw/frame';
import ShwDivider from 'showcase/components/shw/divider';

const SubSectionDemo: TemplateOnlyComponent = <template>
  <ShwTextH2>Demo</ShwTextH2>

  <ShwFrame
    @id="demo-viewport-breakpoints-visualization"
    @src="/foundations/breakpoints/frameless/demo-viewport-breakpoints-visualization"
    @height="780"
    @label="Breakpoints visualization"
  />

  <ShwDivider @level={{2}} />

  <ShwFrame
    @id="demo-viewport-breakpoints-visualization-with-ui-shell"
    @src="/foundations/breakpoints/frameless/demo-viewport-breakpoints-visualization-with-ui-shell"
    @height="780"
    @label="Breakpoints visualization (with UI shell)"
  />

  <ShwDivider />

  <ShwFrame
    @id="demo-viewport-breakpoints-page-padding-sm"
    @src="/foundations/breakpoints/frameless/demo-viewport-breakpoints-page-padding"
    @width="400"
    @height="120"
    @label="Page padding / 'sm' breakpoint"
  />

  <ShwFrame
    @id="demo-viewport-breakpoints-page-padding-md"
    @src="/foundations/breakpoints/frameless/demo-viewport-breakpoints-page-padding"
    @width="800"
    @height="120"
    @label="Page padding / 'md' breakpoint"
  />

  <ShwFrame
    @id="demo-viewport-breakpoints-page-padding-lg"
    @src="/foundations/breakpoints/frameless/demo-viewport-breakpoints-page-padding"
    @width="1200"
    @height="120"
    @label="Page padding / 'lg' breakpoint"
  />
</template>;

export default SubSectionDemo;
