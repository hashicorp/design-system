/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import MockDemoBreakpointsRuler from 'showcase/components/mock/demo/breakpoints-ruler';
import MockDemoBreakpointsVisualization from 'showcase/components/mock/demo/breakpoints-visualization';

const PageFoundationsBreakpointsFramelessDemoViewportBreakpointsVisualization: TemplateOnlyComponent =
  <template>
    {{pageTitle "Breakpoints Visualization - Frameless"}}

    <MockDemoBreakpointsRuler />
    <MockDemoBreakpointsVisualization />
  </template>;

export default PageFoundationsBreakpointsFramelessDemoViewportBreakpointsVisualization;
