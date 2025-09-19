import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsLayoutFlex,
  HdsLayoutFlexItem,
} from '@hashicorp/design-system-components/components';

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwDivider />

  <ShwTextH2>FlexItem</ShwTextH2>

  <ShwGrid @columns={{1}} as |SG|>
    <SG.Item
      @label="used directly or via yielded component"
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <HdsLayoutFlex as |HLF|>
        <ShwPlaceholder @text="item #1" @height="40" />
        <HdsLayoutFlexItem>
          <ShwPlaceholder
            @text="item #2 within FlexItem"
            @height="40"
            @background="transparent"
          />
        </HdsLayoutFlexItem>
        <ShwPlaceholder @text="item #3" @height="40" />
        <HLF.Item>
          <ShwPlaceholder
            @text="item #4 within HLF.Item"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
      </HdsLayoutFlex>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>Basis</ShwTextH3>

  <ShwGrid @columns={{1}} as |SG|>
    <SG.Item
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
      as |SGI|
    >
      <SGI.Label>with <code>size</code> values</SGI.Label>
      <HdsLayoutFlex as |HLF|>
        <HLF.Item @basis={{0}}>
          <ShwPlaceholder
            @text="item #1 with basis=0"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @basis="10em">
          <ShwPlaceholder
            @text="item #2 with basis=10em"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @basis="200px">
          <ShwPlaceholder
            @text="item #3 with basis=200px"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @basis="40%">
          <ShwPlaceholder
            @text="item #4 with basis=40%"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @basis="6vw">
          <ShwPlaceholder
            @text="item #5 with basis=6vw"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
      </HdsLayoutFlex>
    </SG.Item>
    <SG.Item
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
      as |SGI|
    >
      <SGI.Label>with <code>keyword</code> values</SGI.Label>
      <HdsLayoutFlex as |HLF|>
        <HLF.Item @basis="auto">
          <ShwPlaceholder
            @text="item #1 with basis=auto"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @basis="content">
          <ShwPlaceholder
            @text="item #2 with basis=content"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @basis="max-content">
          <ShwPlaceholder
            @text="item #3 with basis=max-content"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @basis="fit-content">
          <ShwPlaceholder
            @text="item #4 with basis=fit-content"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
      </HdsLayoutFlex>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>Grow</ShwTextH3>

  <ShwGrid @columns={{1}} as |SG|>
    <SG.Item
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
      as |SGI|
    >
      <SGI.Label>with
        <code>0/1</code>
        and
        <code>true/false</code>
        values</SGI.Label>
      <HdsLayoutFlex as |HLF|>
        <HLF.Item @grow={{0}}>
          <ShwPlaceholder
            @text="item #1 with grow=0"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @grow={{1}}>
          <ShwPlaceholder
            @text="item #2 with grow=1"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @grow={{false}}>
          <ShwPlaceholder
            @text="item #3 with grow=false"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @grow={{true}}>
          <ShwPlaceholder
            @text="item #4 with grow=true"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
      </HdsLayoutFlex>
    </SG.Item>
    <SG.Item
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
      as |SGI|
    >
      <SGI.Label>with
        <code>numeric/string</code>
        values (to handle special cases)</SGI.Label>
      <HdsLayoutFlex as |HLF|>
        <HLF.Item @grow={{2}}>
          <ShwPlaceholder
            @text="item #1 with grow=2"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @grow={{3}}>
          <ShwPlaceholder
            @text="item #2 with grow=3"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @grow="4">
          <ShwPlaceholder
            @text="item #3 with grow='4'"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
        <HLF.Item @grow="5">
          <ShwPlaceholder
            @text="item #4 with grow='5'"
            @height="40"
            @background="transparent"
          />
        </HLF.Item>
      </HdsLayoutFlex>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>Shrink</ShwTextH3>

  <ShwGrid @columns={{1}} as |SG|>
    <SG.Item
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
      as |SGI|
    >
      <SGI.Label>with
        <code>0/1</code>
        and
        <code>true/false</code>
        values</SGI.Label>
      <div {{style max-width="600px"}}>
        <HdsLayoutFlex as |HLF|>
          <HLF.Item @basis="300px" @shrink={{0}}>
            <ShwPlaceholder
              @text="item #1 with shrink=0"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
          <HLF.Item @basis="300px" @shrink={{1}}>
            <ShwPlaceholder
              @text="item #2 with shrink=1"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
          <HLF.Item @basis="300px" @shrink={{false}}>
            <ShwPlaceholder
              @text="item #3 with shrink=false"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
          <HLF.Item @basis="300px" @shrink={{true}}>
            <ShwPlaceholder
              @text="item #4 with shrink=true"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
        </HdsLayoutFlex>
      </div>
    </SG.Item>
    <SG.Item
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
      as |SGI|
    >
      <SGI.Label>with
        <code>numeric/string</code>
        values (to handle special cases)</SGI.Label>
      <div {{style max-width="600px"}}>
        <HdsLayoutFlex as |HLF|>
          <HLF.Item @basis="300px" @shrink={{2}}>
            <ShwPlaceholder
              @text="item #1 with shrink=2"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
          <HLF.Item @basis="300px" @shrink={{3}}>
            <ShwPlaceholder
              @text="item #2 with shrink=3"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
          <HLF.Item @basis="300px" @shrink="4">
            <ShwPlaceholder
              @text="item #3 with shrink='4'"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
          <HLF.Item @basis="300px" @shrink="5">
            <ShwPlaceholder
              @text="item #4 with shrink='5'"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
        </HdsLayoutFlex>
      </div>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>enableCollapseBelowContentSize</ShwTextH3>

  <ShwTextBody>This property applies a
    <code>min-width: 0</code>
    to the flex item to allow the element to shrink below its content's
    intrinsic minimum width.</ShwTextBody>

  <ShwGrid @columns={{1}} as |SG|>
    <SG.Item
      @label="first flex item has enableCollapseBelowContentSize=true"
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <div {{style max-width="600px"}}>
        <HdsLayoutFlex as |HLF|>
          <HLF.Item @enableCollapseBelowContentSize={{true}}>
            <ShwPlaceholder @height="40" @background="transparent">
              <span
                {{style
                  display="block"
                  white-space="nowrap"
                  overflow="hidden"
                  text-overflow="ellipsis"
                }}
              >item #1 with a very long text that might cause overflow issues</span>
            </ShwPlaceholder>
          </HLF.Item>
          <HLF.Item>
            <ShwPlaceholder
              @text="item #2 with width=150px"
              @width="150px"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
          <HLF.Item>
            <ShwPlaceholder
              @text="item #3 with width=150px"
              @width="150px"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
          <HLF.Item>
            <ShwPlaceholder
              @text="item #4"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
        </HdsLayoutFlex>
      </div>
    </SG.Item>
    <SG.Item
      @label="first flex item has basis=0px"
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <div {{style max-width="600px"}}>
        <HdsLayoutFlex as |HLF|>
          <HLF.Item @basis="0px">
            <ShwPlaceholder @height="40" @background="transparent">
              <pre
                {{style
                  white-space="nowrap"
                  overflow="hidden"
                  text-overflow="ellipsis"
                }}
              >item #1 with a very long
                text that might cause overflow issues</pre>
            </ShwPlaceholder>
          </HLF.Item>
          <HLF.Item>
            <ShwPlaceholder
              @text="item #2 with width=150px"
              @width="150px"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
          <HLF.Item>
            <ShwPlaceholder
              @text="item #3 with width=150px"
              @width="150px"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
          <HLF.Item>
            <ShwPlaceholder
              @text="item #4"
              @height="40"
              @background="transparent"
            />
          </HLF.Item>
        </HdsLayoutFlex>
      </div>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionBaseElements;
