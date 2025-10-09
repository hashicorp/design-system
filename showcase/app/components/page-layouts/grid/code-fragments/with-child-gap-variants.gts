import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

import type { HdsLayoutGridGaps } from '@hashicorp/design-system-components/components/hds/layout/grid/types';

interface CodeFragmentWithChildGapVariantsSignature {
  Args: {
    childGap?: HdsLayoutGridGaps;
  };
}

const CodeFragmentWithChildGapVariants: TemplateOnlyComponent<CodeFragmentWithChildGapVariantsSignature> =
  <template>
    <HdsLayoutGrid @gap="16" @align="center" as |LG|>
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
  </template>;

export default CodeFragmentWithChildGapVariants;
