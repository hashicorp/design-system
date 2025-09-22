/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import MockApp from 'showcase/components/mock/app';
import MockDemoBreakpointsRuler from 'showcase/components/mock/demo/breakpoints-ruler';
import MockDemoBreakpointsVisualization from 'showcase/components/mock/demo/breakpoints-visualization';

const PageFoundationsBreakpointsFramelessDemoViewportBreakpointsVisualizationWithUIShell: TemplateOnlyComponent =
  <template>
    {{pageTitle "Breakpoints Visualization with UI Shell  - Frameless"}}

    <MockApp>
      <:main as |M|>
        <M.PageHeader @showActionButton={{true}} />
        <MockDemoBreakpointsRuler />
        <MockDemoBreakpointsVisualization />
      </:main>
    </MockApp>
  </template>;

export default PageFoundationsBreakpointsFramelessDemoViewportBreakpointsVisualizationWithUIShell;
