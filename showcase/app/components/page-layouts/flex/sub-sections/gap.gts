import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { eq } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsLayoutFlex,
  HdsLayoutGrid,
} from '@hashicorp/design-system-components/components';

import {
  DIRECTIONS,
  GAPS,
} from '@hashicorp/design-system-components/components/hds/layout/flex/index';

import type { HdsLayoutFlexGaps } from '@hashicorp/design-system-components/components/hds/layout/flex/types';

const DEMO_GAP_ARRAYS:
  | HdsLayoutFlexGaps
  | [HdsLayoutFlexGaps, HdsLayoutFlexGaps][] = [
  ['4', '48'],
  ['8', '32'],
  ['12', '24'],
  ['16', '16'],
];

const SubSectionGap: TemplateOnlyComponent = <template>
  <ShwTextH2>Gap</ShwTextH2>

  <ShwTextH4 @tag="h3">Single value</ShwTextH4>

  {{#each DIRECTIONS as |direction|}}
    <ShwGrid @columns={{4}} @gap="1rem 2rem" as |SG|>
      {{#each GAPS as |gap|}}
        <SG.Item
          @label="gap={{if (eq gap '0') '0 (default)' gap}}"
          class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
        >
          <HdsLayoutFlex @direction={{direction}} @gap={{gap}}>
            <ShwPlaceholder @text="#1" @height="24" />
            <ShwPlaceholder @text="#2" @height="24" />
            <ShwPlaceholder @text="#3" @height="24" />
            <ShwPlaceholder @text="#4" @height="24" />
          </HdsLayoutFlex>
        </SG.Item>
      {{/each}}
    </ShwGrid>
  {{/each}}

  <ShwTextH4 @tag="h3">Double value (row/column)</ShwTextH4>

  <ShwFlex @gap="2rem 4rem" as |SF|>
    {{! we use only a subset of possible combinations, just for testing purposes }}
    {{#each DEMO_GAP_ARRAYS as |gapsArray|}}
      <SF.Item
        @label="gap=[{{gapsArray}}]"
        class="shw-layout-flex-example-outline-flex-container"
      >
        <div {{style width="500px"}}>
          <HdsLayoutFlex @gap={{gapsArray}} @wrap={{true}}>
            <ShwPlaceholder @text="item #1" @width="100px" @height="24" />
            <ShwPlaceholder @text="item #2" @width="100px" @height="24" />
            <ShwPlaceholder @text="item #3" @width="100px" @height="24" />
            <ShwPlaceholder @text="item #4" @width="100px" @height="24" />
            <ShwPlaceholder @text="item #5" @width="100px" @height="24" />
            <ShwPlaceholder @text="item #6" @width="100px" @height="24" />
            <ShwPlaceholder @text="item #7" @width="100px" @height="24" />
            <ShwPlaceholder @text="item #8" @width="100px" @height="24" />
          </HdsLayoutFlex>
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <br />
  <br />

  <ShwTextH4 @tag="h3">Nested layouts</ShwTextH4>

  <ShwFlex
    @gap="2rem"
    @direction="column"
    class="shw-layout-flex-example-nested-layouts"
    as |SF|
  >
    <SF.Item
      @label="Parent Flex w/ @gap=16, nested Flex without/ @gap (defaults to 0)"
    >
      <HdsLayoutFlex @gap="16" @align="center" as |LF|>
        <ShwPlaceholder @text="item #1" @height="48" />
        <ShwPlaceholder @text="item #2" @height="48" />
        <LF.Item @basis="25%" @grow="0" @shrink="0">
          <HdsLayoutFlex>
            <ShwPlaceholder @text="item #3A" @height="24" />
            <ShwPlaceholder @text="item #3B" @height="24" />
            <ShwPlaceholder @text="item #3C" @height="24" />
          </HdsLayoutFlex>
        </LF.Item>
        <ShwPlaceholder @text="item #4" @height="48" />
      </HdsLayoutFlex>
    </SF.Item>
    <SF.Item @label="Parent Flex w/ @gap=16, nested Flex wo/ @gap=0 (explicit)">
      <HdsLayoutFlex @gap="16" @align="center" as |LF|>
        <ShwPlaceholder @text="item #1" @height="48" />
        <ShwPlaceholder @text="item #2" @height="48" />
        <LF.Item @basis="25%" @grow="0" @shrink="0">
          <HdsLayoutFlex @gap="0">
            <ShwPlaceholder @text="item #3A" @height="24" />
            <ShwPlaceholder @text="item #3B" @height="24" />
            <ShwPlaceholder @text="item #3C" @height="24" />
          </HdsLayoutFlex>
        </LF.Item>
        <ShwPlaceholder @text="item #4" @height="48" />
      </HdsLayoutFlex>
    </SF.Item>
    <SF.Item @label="Parent Flex w/ @gap=48, nested Flex w/ @gap=16">
      <HdsLayoutFlex @gap="48" @align="center" as |LF|>
        <ShwPlaceholder @text="item #1" @height="48" />
        <ShwPlaceholder @text="item #2" @height="48" />
        <LF.Item @basis="25%" @grow="0" @shrink="0">
          <HdsLayoutFlex @gap="16">
            <ShwPlaceholder @text="item #3A" @height="24" />
            <ShwPlaceholder @text="item #3B" @height="24" />
            <ShwPlaceholder @text="item #3C" @height="24" />
          </HdsLayoutFlex>
        </LF.Item>
        <ShwPlaceholder @text="item #4" @height="48" />
      </HdsLayoutFlex>
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
  </ShwFlex>

  <br />
  <br />

  <ShwTextH4 @tag="h3">Custom values (overrides)</ShwTextH4>

  <ShwFlex @direction="column" @gap="2rem" as |SF|>
    <SF.Item
      @label="gap-column=20px (via classname)"
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <HdsLayoutFlex class="shw-layout-flex-example-gap-override">
        <ShwPlaceholder @text="#1" @height="24" />
        <ShwPlaceholder @text="#2" @height="24" />
        <ShwPlaceholder @text="#3" @height="24" />
        <ShwPlaceholder @text="#4" @height="24" />
      </HdsLayoutFlex>
    </SF.Item>
    <SF.Item
      @label="gap-column=1.25rem / gap-row=20px (via inline style)"
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <HdsLayoutFlex
        @wrap={{true}}
        {{style
          --hds-layout-flex-row-gap="20px"
          --hds-layout-flex-column-gap="1.25rem"
        }}
      >
        <ShwPlaceholder @text="#1" @width="45%" @height="24" />
        <ShwPlaceholder @text="#2" @width="45%" @height="24" />
        <ShwPlaceholder @text="#3" @width="45%" @height="24" />
        <ShwPlaceholder @text="#4" @width="45%" @height="24" />
      </HdsLayoutFlex>
    </SF.Item>
  </ShwFlex>
  
  <ShwDivider @level={{2}} />
</template>;

export default SubSectionGap;
