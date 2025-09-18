import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsLayoutFlex,
  HdsTextBody,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

const SubSectionExamples: TemplateOnlyComponent = <template>
  <ShwDivider />

  <ShwTextH2>Examples</ShwTextH2>

  <ShwFlex @direction="column" @gap="2rem" as |SF|>
    <SF.Item
      @label="icon + text"
      class="shw-layout-flex-example-outline-flex-blocks"
    >
      <HdsLayoutFlex @align="center" @gap="8">
        <HdsIcon @name="info" @size="24" />
        <HdsTextBody @size="200" @tag="p">Lorem ipsum dolor sit amet</HdsTextBody>
      </HdsLayoutFlex>
    </SF.Item>
    <SF.Item
      @label="media + text"
      class="shw-layout-flex-example-outline-flex-blocks"
    >
      <HdsLayoutFlex @align="center" @gap="8">
        <img
          src="/assets/images/avatar.png"
          alt="portrait of a cat wearing old-fashioned formal wear"
          class="shw-layout-flex-example-avatar"
        />
        <HdsTextBody @size="200" @tag="p">Lorem ipsum dolor sit amet</HdsTextBody>
      </HdsLayoutFlex>
    </SF.Item>
    <SF.Item
      @label="generic input + button"
      class="shw-layout-flex-example-outline-flex-blocks"
    >
      <HdsLayoutFlex @align="center" @gap="8">
        <input
          id="example-input-1"
          type="text"
          placeholder="Just a generic input"
        />
        <button type="button">Button</button>
      </HdsLayoutFlex>
    </SF.Item>
    <SF.Item
      @label="centered content"
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <HdsLayoutFlex
        @justify="center"
        @align="center"
        {{style width="300px" height="200px"}}
      >
        <HdsTextBody @size="200" @tag="p" {{style padding="4px 8px"}}>I am
          centered</HdsTextBody>
      </HdsLayoutFlex>
    </SF.Item>
    <SF.Item
      @label="equally spaced"
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <HdsLayoutFlex @justify="space-between" @align="center" @tag="section">
        <HdsTextBody
          @size="200"
          @tag="p"
          {{style padding="4px 8px"}}
        >We</HdsTextBody>
        <HdsTextBody
          @size="200"
          @tag="p"
          {{style padding="4px 8px"}}
        >Should</HdsTextBody>
        <HdsTextBody
          @size="200"
          @tag="p"
          {{style padding="4px 8px"}}
        >All</HdsTextBody>
        <HdsTextBody
          @size="200"
          @tag="p"
          {{style padding="4px 8px"}}
        >Be</HdsTextBody>
        <HdsTextBody
          @size="200"
          @tag="p"
          {{style padding="4px 8px"}}
        >Equally</HdsTextBody>
        <HdsTextBody
          @size="200"
          @tag="p"
          {{style padding="4px 8px"}}
        >Spaced</HdsTextBody>
      </HdsLayoutFlex>
    </SF.Item>
    <SF.Item
      @label="one item growing"
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <HdsLayoutFlex @gap="16" as |HLF|>
        <HdsTextBody @size="200" @tag="p" {{style padding="4px 8px"}}>I use only
          the content width</HdsTextBody>
        <HLF.Item @grow={{1}} @tag="article">
          <HdsTextBody @size="200" @tag="p" {{style padding="4px 8px"}}>I use
            all the rest of the available space</HdsTextBody>
        </HLF.Item>
        <HdsTextBody @size="200" @tag="p" {{style padding="4px 8px"}}>I use only
          the content width</HdsTextBody>
      </HdsLayoutFlex>
    </SF.Item>
    <SF.Item
      @label="one item at the end"
      class="shw-layout-flex-example-outline-flex-container shw-layout-flex-example-tint-flex-items"
    >
      <HdsLayoutFlex @gap="16" @tag="section">
        <HdsTextBody @size="200" @tag="p" {{style padding="4px 8px"}}>I am on
          the left side</HdsTextBody>
        <HdsTextBody @size="200" @tag="p" {{style padding="4px 8px"}}>I am on
          the left side too</HdsTextBody>
        <HdsTextBody
          @size="200"
          @tag="p"
          {{style padding="4px 8px"}}
          {{style margin-left="auto"}}
        >I on the right side (using margin-left auto)</HdsTextBody>
      </HdsLayoutFlex>

    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionExamples;
