/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

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
