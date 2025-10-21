import Component from '@glimmer/component';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

import type { HdsLayoutGridSignature } from '@hashicorp/design-system-components/components/hds/layout/grid/index';

interface CodeFragmentWithChildGapVariantsSignature {
  Args: {
    childGap?: HdsLayoutGridSignature['Args']['gap'];
    gap?: HdsLayoutGridSignature['Args']['gap'];
  };
}

export default class CodeFragmentWithGapVariants extends Component<CodeFragmentWithChildGapVariantsSignature> {
  get gap(): HdsLayoutGridSignature['Args']['gap'] {
    return this.args.gap ?? '16';
  }

  <template>
    <HdsLayoutGrid @gap={{this.gap}} @align="center" as |LG|>
      <ShwPlaceholder @text="item #1" @height="48" />
      <ShwPlaceholder @text="item #2" @height="48" />
      <LG.Item>
        <HdsLayoutGrid @gap={{@childGap}}>
          <ShwPlaceholder @text="item #3A" @height="24" />
          <ShwPlaceholder @text="item #3B" @height="24" />
          <ShwPlaceholder @text="item #3C" @height="24" />
        </HdsLayoutGrid>
      </LG.Item>
      <ShwPlaceholder @text="item #4" @height="48" />
    </HdsLayoutGrid>
  </template>
}
