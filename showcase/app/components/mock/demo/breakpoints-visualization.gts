/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// import style from 'ember-style-modifier';

import ShwFlex from '../../shw/flex';
import ShwGrid from '../../shw/grid';
import ShwLabel from '../../shw/label';
import ShwOutliner from '../../shw/outliner';
import ShwPlaceholder from '../../shw/placeholder';
import ShwTextH2 from '../../shw/text/h2';
import ShwTextH3 from '../../shw/text/h3';
import MockDemoBreakpointsRuler from './breakpoints-ruler';

import { hdsBreakpointsList } from './hds-breakpoints';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MockDemoBreakpointsVisualizationSignature {}

<template>
  <div class="mock-demo-breakpoints-visualization" ...attributes>

    <ShwTextH2>Sass mixins</ShwTextH2>

    <ShwTextH3><code>breakpoint-up / breakpoint</code></ShwTextH3>
    <ShwFlex @direction="column" as |SF|>
      {{#each hdsBreakpointsList as |breakpoint|}}
        <SF.Item>
          <ShwPlaceholder
            class="mock-demo-breakpoints-mixin__breakpoint-up--{{breakpoint}}"
            @text={{breakpoint}}
            @height="20"
          />
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <ShwTextH3><code>breakpoint-down</code></ShwTextH3>
    <ShwFlex @direction="column" as |SF|>
      {{#each hdsBreakpointsList as |breakpoint|}}
        <SF.Item>
          <ShwPlaceholder
            class="mock-demo-breakpoints-mixin__breakpoint-down--{{breakpoint}}"
            @text={{breakpoint}}
            @height="20"
          />
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <ShwTextH3><code>breakpoint-between</code></ShwTextH3>
    <ShwGrid @columns={{hdsBreakpointsList.length}} as |SG|>
      {{#each hdsBreakpointsList as |breakpoint-lower|}}
        {{#each hdsBreakpointsList as |breakpoint-upper|}}
          <SG.Item>
            <ShwPlaceholder
              class="mock-demo-breakpoints-mixin__breakpoint-between--lower-{{breakpoint-lower}}-upper-{{breakpoint-upper}}"
              @text="{{breakpoint-lower}} / {{breakpoint-upper}}"
              @height="20"
            />
          </SG.Item>
        {{/each}}
      {{/each}}
    </ShwGrid>

    <ShwTextH3><code>hide-at</code></ShwTextH3>
    <ShwGrid @columns={{5}} @gap="2rem" as |SG|>
      {{#each hdsBreakpointsList as |breakpoint|}}
        <SG.Item>
          <ShwPlaceholder
            class="mock-demo-breakpoints-mixin__hide-at--{{breakpoint}}
              mock-demo-breakpoints-color--{{breakpoint}}"
            @text={{breakpoint}}
            @height="20"
          />
        </SG.Item>
      {{/each}}
    </ShwGrid>

  </div>
</template>
