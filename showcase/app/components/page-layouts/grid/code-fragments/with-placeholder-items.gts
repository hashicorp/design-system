import Component from '@glimmer/component';

import ShwOutliner from 'showcase/components/shw/outliner';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

import type { HdsLayoutGridSignature } from '@hashicorp/design-system-components/components/hds/layout/grid/index';

interface CodeFragmentWithChildGapVariantsSignature {
  Args: {
    columnCount?: number;
    columnMinWidth?: HdsLayoutGridSignature['Args']['columnMinWidth'];
    columnWidth?: HdsLayoutGridSignature['Args']['columnWidth'];
  };
}

export default class CodeFragmentWithPlaceholderItems extends Component<CodeFragmentWithPlaceholderItemsSignature> {
  get columnCount() {
    return this.args.columnCount ?? 4;
  }

  get columnArray() {
    return Array.from({ length: this.columnCount }, (_, i) => i + 1);
  }

  <template>
    <ShwOutliner>
      <HdsLayoutGrid
        @gap="24"
        @columnMinWidth={{@columnMinWidth}}
        @columnWidth={{@columnWidth}}
      >
        {{#each this.columnArray as |column|}}
          <ShwPlaceholder @text="#{{column}}" @height="40" />
        {{/each}}
      </HdsLayoutGrid>
    </ShwOutliner>
  </template>
}
