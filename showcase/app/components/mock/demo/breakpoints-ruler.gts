/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hdsBreakpointsNames } from '@hashicorp/design-system-components/foundations/breakpoints';

import ShwLabel from '../../shw/label';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MockDemoBreakpointsRulerSignature {}

<template>
  <div class="mock-demo-breakpoints-ruler">
    {{#each hdsBreakpointsNames as |breakpoint|}}
      <ShwLabel
        class="mock-demo-breakpoints-ruler__mark mock-demo-breakpoints-ruler__mark--{{breakpoint}}"
      />
    {{/each}}
  </div>
</template>
