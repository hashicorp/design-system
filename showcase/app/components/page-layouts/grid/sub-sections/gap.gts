import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { eq } from 'ember-truth-helpers';
import { array } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwOutliner from 'showcase/components/shw/outliner';

import {
  HdsLayoutFlex,
  HdsLayoutGrid,
} from '@hashicorp/design-system-components/components';
import { GAPS } from '@hashicorp/design-system-components/components/hds/layout/grid/index';

import type { HdsLayoutGridGaps } from '@hashicorp/design-system-components/components/hds/layout/grid/types';

import CodeFragmentWithGapVariants from '../code-fragments/with-gap-variants';

const DEMO_GAP_ARRAYS:
  | HdsLayoutGridGaps
  | [HdsLayoutGridGaps, HdsLayoutGridGaps][] = [
  ['4', '48'],
  ['8', '32'],
  ['12', '24'],
  ['16', '16'],
];

const SubSectionGap: TemplateOnlyComponent = <template>
  <ShwTextH2>Gap</ShwTextH2>

  <ShwTextH4 @tag="h3">Single value</ShwTextH4>

  <ShwGrid
    @columns={{4}}
    @gap="2rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    {{#each GAPS as |gap|}}
      <SG.Item @label="gap={{if (eq gap '0') '0 (default)' gap}}">
        <ShwOutliner>
          <HdsLayoutGrid @gap={{gap}} @columnMinWidth="50%">
            {{#each (array "1" "2" "3" "4") as |item|}}
              <ShwPlaceholder @text=" #{{item}}" @height="24" />
            {{/each}}
          </HdsLayoutGrid>
        </ShwOutliner>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH4 @tag="h3">Double value (row/column)</ShwTextH4>

  <ShwGrid
    @columns={{2}}
    @gap="2rem 4rem"
    class="shw-layout-grid-example-tint-flex-items"
    as |SG|
  >
    {{! we use only a subset of possible combinations, just for testing purposes }}
    {{#each DEMO_GAP_ARRAYS as |gapsArray|}}
      <SG.Item @label="gap=[{{gapsArray}}]">
        <ShwOutliner>
          <HdsLayoutGrid @gap={{gapsArray}} @columnMinWidth="50%">
            {{#each (array "1" "2" "3" "4" "5" "6" "7" "8") as |item|}}
              <ShwPlaceholder
                @text="item #{{item}}"
                @width="auto"
                @height="24"
              />
            {{/each}}
          </HdsLayoutGrid>
        </ShwOutliner>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <br />
  <br />

  <ShwTextH4 @tag="h3">Nested layouts</ShwTextH4>

  <ShwFlex
    @gap="2rem"
    @direction="column"
    class="shw-layout-grid-example-nested-layouts"
    as |SF|
  >
    <SF.Item
      @label="Parent Grid w/ @gap=16, nested Grid wo/ @gap (defaults to 0)"
    >
      <CodeFragmentWithGapVariants />
    </SF.Item>
    <SF.Item @label="Parent Grid w/ @gap=16, nested Grid w/ @gap=0 (explicit)">
      <CodeFragmentWithGapVariants @childGap="0" />
    </SF.Item>
    <SF.Item @label="Parent Grid w/ @gap=48, nested Grid w/ @gap=16">
      <CodeFragmentWithGapVariants @gap="48" @childGap="16" />
    </SF.Item>
    <SF.Item @label="Parent Grid w/ @gap=48, nested Flex w/ @gap=16">
      <HdsLayoutGrid @gap="48" @align="center" as |LG|>
        <ShwPlaceholder @text="item #1" @height="48" />
        <ShwPlaceholder @text="item #2" @height="48" />
        <LG.Item>
          <HdsLayoutFlex @gap="16">
            <ShwPlaceholder @text="item #3A" @height="24" />
            <ShwPlaceholder @text="item #3B" @height="24" />
            <ShwPlaceholder @text="item #3C" @height="24" />
          </HdsLayoutFlex>
        </LG.Item>
        <ShwPlaceholder @text="item #4" @height="48" />
      </HdsLayoutGrid>
    </SF.Item>
    <SF.Item @label="Parent Flex w/ @gap=48, nested Grid w/ @gap=16">
      <HdsLayoutFlex @gap="48" @align="center" as |LF|>
        <ShwPlaceholder @text="item #1" @height="48" />
        <ShwPlaceholder @text="item #2" @height="48" />
        <LF.Item @basis="25%" @grow="0" @shrink="0">
          <HdsLayoutGrid @gap="16">
            <ShwPlaceholder @text="item #3A" @height="24" />
            <ShwPlaceholder @text="item #3B" @height="24" />
            <ShwPlaceholder @text="item #3C" @height="24" />
          </HdsLayoutGrid>
        </LF.Item>
        <ShwPlaceholder @text="item #4" @height="48" />
      </HdsLayoutFlex>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionGap;
