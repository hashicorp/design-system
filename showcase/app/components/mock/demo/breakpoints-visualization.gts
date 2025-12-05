/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import gt from 'ember-truth-helpers/helpers/gt';

import { hdsBreakpoints } from '@hashicorp/design-system-components/utils/hds-breakpoints';

import ShwFlex from '../../shw/flex';
import ShwGrid from '../../shw/grid';
import ShwPlaceholder from '../../shw/placeholder';
import ShwTextH2 from '../../shw/text/h2';
import ShwTextH3 from '../../shw/text/h3';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MockDemoBreakpointsVisualizationSignature {}

const hdsBreakpointsNames = Object.keys(hdsBreakpoints);

export default class MockDemoBreakpointsVisualization extends Component<MockDemoBreakpointsVisualizationSignature> {
  get breakpointBetweenGridColumns(): number {
    return hdsBreakpointsNames.length - 1;
  }

  <template>
    <div class="mock-demo-breakpoints-visualization">

      <ShwTextH2>Sass mixins</ShwTextH2>

      <ShwTextH3><code>breakpoint-above</code></ShwTextH3>
      <ShwFlex @direction="column" as |SF|>
        {{#each hdsBreakpointsNames as |breakpoint|}}
          <SF.Item>
            <ShwPlaceholder
              class="mock-demo-breakpoints-mixin__breakpoint-above--{{breakpoint}}"
              @text={{breakpoint}}
              @height="20"
            />
          </SF.Item>
        {{/each}}
      </ShwFlex>

      <ShwTextH3><code>breakpoint-below</code></ShwTextH3>
      <ShwFlex @direction="column" as |SF|>
        {{#each hdsBreakpointsNames as |breakpoint|}}
          <SF.Item>
            <ShwPlaceholder
              class="mock-demo-breakpoints-mixin__breakpoint-below--{{breakpoint}}"
              @text={{breakpoint}}
              @height="20"
            />
          </SF.Item>
        {{/each}}
      </ShwFlex>

      <ShwTextH3><code>breakpoint-between</code></ShwTextH3>
      <ShwFlex @direction="column" as |SF|>
        {{#each hdsBreakpointsNames as |breakpointLower indexLower|}}
          {{#each hdsBreakpointsNames as |breakpointUpper indexUupper|}}
            {{#if (gt indexUupper indexLower)}}
              <SF.Item>
                <ShwGrid
                  @columns={{this.breakpointBetweenGridColumns}}
                  @gap="0"
                  as |SG|
                >
                  <SG.Item>
                    <ShwPlaceholder
                      class="mock-demo-breakpoints-mixin__breakpoint-between--lower-{{breakpointLower}}-upper-{{breakpointUpper}}"
                      @text="{{breakpointLower}} / {{breakpointUpper}}"
                      @height="20"
                    />
                  </SG.Item>
                </ShwGrid>
              </SF.Item>
            {{/if}}
          {{/each}}
        {{/each}}
      </ShwFlex>

    </div>
  </template>
}
