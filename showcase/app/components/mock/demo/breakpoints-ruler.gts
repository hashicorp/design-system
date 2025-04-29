/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { array } from '@ember/helper';

import ShwLabel from '../../shw/label';

import { hdsBreakpointsList } from './hds-breakpoints';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MockDemoBreakpointsRulerSignature {}

<template>
  <div class="mock-demo-breakpoints-ruler" ...attributes>
    {{#each hdsBreakpointsList as |breakpoint|}}
      <ShwLabel
        class="mock-demo-breakpoints-ruler__mark mock-demo-breakpoints-ruler__mark--{{breakpoint}}"
      />
    {{/each}}
  </div>
</template>
