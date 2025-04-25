/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import ShwLabel from '../../shw/label';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MockDemoBreakpointsVisualizationSignature {}

<template>
  <div class="mock-demo-breakpoints-visualization">
    <ShwLabel class="mock-demo-breakpoints-visualization__viewport-label">Current viewport:
      <span class="mock-demo-breakpoints-visible--only-at-sm"><strong>sm </strong>(breakpoint: 320px)</span>
      <span class="mock-demo-breakpoints-visible--only-at-md"><strong>md </strong>(breakpoint: 672px)</span>
      <span class="mock-demo-breakpoints-visible--only-at-lg"><strong>lg </strong>(breakpoint: 1056px)</span>
      <span class="mock-demo-breakpoints-visible--only-at-xlg"><strong>xlg</strong> (breakpoint: 1312px)</span>
      <span class="mock-demo-breakpoints-visible--only-at-max"><strong>max</strong> (breakpoint: 1584px)</span>
      <span class="mock-demo-breakpoints-visible--only-at-BOH"><strong>TBD</strong> (breakpoint: 1584px)</span>
    </ShwLabel>
    <pre>DEMO</pre>
  </div>
</template>
