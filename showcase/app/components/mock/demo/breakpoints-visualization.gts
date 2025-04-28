/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import ShwLabel from '../../shw/label';
import ShwTextH2 from '../../shw/text/h2';
import MockDemoBreakpointsRuler from './breakpoints-ruler';

import { hdsBreakpointsList } from './hds-breakpoints';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MockDemoBreakpointsVisualizationSignature {}

<template>
  <div class="mock-demo-breakpoints-visualization" ...attributes>
    <ShwTextH2>IBM MIXINS</ShwTextH2>
    {{#each hdsBreakpointsList as |breakpoint|}}
      <pre class="mock-demo-breakpoints-mixin__hide-at--{{breakpoint}}">This should be hidden at this breakpoint: {{breakpoint}}</pre>
    {{/each}}
  </div>
</template>
