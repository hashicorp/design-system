import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

const PageFoundationsBreakpointsFramelessDemoViewportBreakpointsPagePadding: TemplateOnlyComponent =
  <template>
    {{pageTitle "Breakpoints for Page Padding - Frameless"}}

    <div class="mock-demo-breakpoints-page-padding">
      <ShwPlaceholder @text="generic content" @height="40" />
    </div>
  </template>;

export default PageFoundationsBreakpointsFramelessDemoViewportBreakpointsPagePadding;
