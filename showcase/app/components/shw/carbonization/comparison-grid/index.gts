/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import ShwLabel from 'showcase/components/shw/label';
import ShwCarbonizationComparisonGridItem from './item';

export interface ShwCarbonizationComparisonGridSignature {
  Args: {
    label?: string;
  };
  Blocks: {
    default: [
      {
        Label: typeof ShwLabel;
        Item: typeof ShwCarbonizationComparisonGridItem;
        // Item: WithBoundArgs<typeof ShwCarbonizationComparisonGridItem, 'area'>;
      },
    ];
  };
  Element: HTMLDivElement;
}

const ShwCarbonizationComparisonGrid: TemplateOnlyComponent<ShwCarbonizationComparisonGridSignature> =
  <template>
    {{#if @label}}
      <ShwLabel>{{@label}}</ShwLabel>
    {{/if}}
    <div class="shw-carbonization-comparison-grid" ...attributes>
      {{yield (hash Label=ShwLabel Item=ShwCarbonizationComparisonGridItem)}}
    </div>
  </template>;

export default ShwCarbonizationComparisonGrid;
