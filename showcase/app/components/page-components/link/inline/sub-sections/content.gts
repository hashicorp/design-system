/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';

import {
  HdsLinkInline,
  HdsTextBody,
  HdsTextDisplay,
  HdsTextCode,
} from '@hashicorp/design-system-components/components';

const TEXT_SIZE_CLASSES = [
  'hds-typography-body-100',
  'hds-typography-body-200',
  'hds-typography-body-300',
];

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwGrid
    @columns={{3}}
    @gap="1rem 2rem"
    {{style width="fit-content" grid-template-columns="repeat(3, auto)"}}
    as |SG|
  >
    <SG.Item @label="Only text">
      <div class="hds-typography-body-300">
        <HdsLinkInline @color="primary" @href="#">Lorem ipsum dolor</HdsLinkInline>
      </div>
    </SG.Item>
    <SG.Item @label="Text + leading icon">
      <div class="hds-typography-body-300">
        <HdsLinkInline
          @color="primary"
          @icon="globe"
          @iconPosition="leading"
          @href="#"
        >Lorem ipsum dolor</HdsLinkInline>
      </div>
    </SG.Item>
    <SG.Item @label="Text + trailing icon">
      <div class="hds-typography-body-300">
        <HdsLinkInline
          @color="primary"
          @icon="arrow-right-circle"
          @iconPosition="trailing"
          @href="#"
        >Lorem ipsum dolor</HdsLinkInline>
      </div>
    </SG.Item>
    <SG.Item @label="HDSTextBody">
      <HdsLinkInline @color="primary" @href="#"><HdsTextBody
          @size="300"
          @tag="span"
        >Lorem ipsum dolor</HdsTextBody></HdsLinkInline>
    </SG.Item>
    <SG.Item @label="HDSTextBody + leading icon">
      <HdsLinkInline
        @color="primary"
        @icon="globe"
        @iconPosition="leading"
        @href="#"
      ><HdsTextBody @size="300" @tag="span">Lorem ipsum dolor</HdsTextBody></HdsLinkInline>
    </SG.Item>
    <SG.Item @label="HDSTextBody + trailing icon">
      <HdsLinkInline
        @color="primary"
        @icon="arrow-right-circle"
        @iconPosition="trailing"
        @href="#"
      ><HdsTextBody @size="300" @tag="span">Lorem ipsum dolor</HdsTextBody></HdsLinkInline>
    </SG.Item>
    <SG.Item @label="HDSTextDisplay">
      <HdsLinkInline @color="primary" @href="#"><HdsTextDisplay
          @size="200"
          @tag="span"
        >Lorem ipsum dolor</HdsTextDisplay></HdsLinkInline>
    </SG.Item>
    <SG.Item @label="HDSTextDisplay + leading icon">
      <HdsLinkInline
        @color="primary"
        @icon="globe"
        @iconPosition="leading"
        @href="#"
      ><HdsTextDisplay @size="200" @tag="span">Lorem ipsum dolor</HdsTextDisplay></HdsLinkInline>
    </SG.Item>
    <SG.Item @label="HDSTextDisplay + trailing icon">
      <HdsLinkInline
        @color="primary"
        @icon="arrow-right-circle"
        @iconPosition="trailing"
        @href="#"
      ><HdsTextDisplay @size="200" @tag="span">Lorem ipsum dolor</HdsTextDisplay></HdsLinkInline>
    </SG.Item>
    <SG.Item @label="HDSTextCode">
      <HdsLinkInline @color="primary" @href="#"><HdsTextCode
          @size="200"
          @tag="code"
        >Lorem ipsum dolor</HdsTextCode></HdsLinkInline>
    </SG.Item>
    <SG.Item @label="HDSTextCode + leading icon">
      <HdsLinkInline
        @color="primary"
        @icon="globe"
        @iconPosition="leading"
        @href="#"
      ><HdsTextCode @size="200" @tag="code">Lorem ipsum dolor</HdsTextCode></HdsLinkInline>
    </SG.Item>
    <SG.Item @label="HDSTextCode + trailing icon">
      <HdsLinkInline
        @color="primary"
        @icon="arrow-right-circle"
        @iconPosition="trailing"
        @href="#"
      ><HdsTextCode @size="200" @tag="code">Lorem ipsum dolor</HdsTextCode></HdsLinkInline>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwFlex as |SF|>
    <SF.Item @label="With different text sizes">
      {{#each TEXT_SIZE_CLASSES as |textSizeClass|}}
        <div class={{textSizeClass}}>
          Lorem
          <HdsLinkInline
            @color="primary"
            @icon="globe"
            @iconPosition="leading"
            @href="#"
          >ipsum dolor</HdsLinkInline>
          sit amet
          <HdsLinkInline
            @color="primary"
            @icon="arrow-right-circle"
            @iconPosition="trailing"
            @href="#"
          >consectetur adipiscing</HdsLinkInline>
          elit.
        </div>
      {{/each}}
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Within text block">
      <div class="hds-typography-body-300">
        <HdsLinkInline @color="primary" @href="#">Lorem ipsum dolor sit amet</HdsLinkInline>,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore.
      </div>
    </SG.Item>
    <SG.Item @label="Span two lines">
      <div class="hds-typography-body-300">
        Lorem ipsum dolor sit amet,
        <HdsLinkInline @color="primary" @href="#">consectetur adipiscing elit</HdsLinkInline>,
        sed do eiusmod tempor incididunt ut labore et dolore.
      </div>
    </SG.Item>
    <SG.Item @label="Span two lines and overlaps">
      <div class="hds-typography-body-300">
        Lorem ipsum dolor sit amet,
        <HdsLinkInline @color="primary" @href="#">consectetur adipiscing elit,
          sed do eiusmod tempor</HdsLinkInline>
        incididunt ut labore et dolore.
      </div>
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionContent;
