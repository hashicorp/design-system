/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { hdsBreakpoints } from '@hashicorp/design-system-components/utils/hds-breakpoints';

import ShwLabel from '../../shw/label';

const hdsBreakpointsNames = Object.keys(hdsBreakpoints);

<template>
  <div class="mock-demo-breakpoints-ruler">
    {{#each hdsBreakpointsNames as |breakpoint|}}
      <ShwLabel
        class="mock-demo-breakpoints-ruler__mark mock-demo-breakpoints-ruler__mark--{{breakpoint}}"
      />
    {{/each}}
  </div>
</template>
