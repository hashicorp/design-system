/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwOutliner from 'showcase/components/shw/outliner';

import CodeFragmentWithCharacterCount from 'showcase/components/page-components/form/base-elements/code-fragments/with-character-count';

import {
  HdsBadge,
  HdsFormError,
  HdsFormHelperText,
  HdsFormIndicator,
  HdsFormLabel,
  HdsFormLegend,
  HdsFormVisibilityToggle,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Label</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With simple text">
      <HdsFormLabel>This is a simple label</HdsFormLabel>
    </SF.Item>
    <SF.Item @label="With required indicator">
      <HdsFormLabel @isRequired={{true}}>This is the label</HdsFormLabel>
    </SF.Item>
    <SF.Item @label="With optional indicator">
      <HdsFormLabel @isOptional={{true}}>This is the label</HdsFormLabel>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>)</SFI.Label>
      <HdsFormLabel>
        <div class="shw-component-form-base-elements-container-with-badge">
          This is the label
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </div>
      </HdsFormLabel>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and required indicator</SFI.Label>
      <HdsFormLabel @isRequired={{true}}>
        <div class="shw-component-form-base-elements-container-with-badge">
          This is the label
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </div>
      </HdsFormLabel>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and optional indicator</SFI.Label>
      <HdsFormLabel @isOptional={{true}}>
        <ShwOutliner
          class="shw-component-form-base-elements-container-with-badge"
        >
          This is the label
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </ShwOutliner>
      </HdsFormLabel>
    </SF.Item>
    <SF.Item @label="With text that spans multiple lines">
      <ShwOutliner {{style max-width="250px"}}>
        <HdsFormLabel>This is a very long label text that should go on multiple
          lines</HdsFormLabel>
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="With text that spans multiple lines and required indicator"
    >
      <ShwOutliner {{style max-width="250px"}}>
        <HdsFormLabel @isRequired={{true}}>This is a very long label text that
          should go on multiple lines</HdsFormLabel>
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="With text that spans multiple lines and optional indicator"
    >
      <ShwOutliner {{style max-width="250px"}}>
        <HdsFormLabel @isOptional={{true}}>This is a very long label text that
          should go on multiple lines</HdsFormLabel>
      </ShwOutliner>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With text that spans multiple lines, structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and required indicator
      </SFI.Label>
      <ShwOutliner {{style max-width="250px"}}>
        <HdsFormLabel @isRequired={{true}}>
          This is a very long label text that should go on multiple lines
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </HdsFormLabel>
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />

  <ShwTextH2>Helper text</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With simple text">
      <HdsFormHelperText>This is the helper text, usually used jointly with the
        label.</HdsFormHelperText>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With <code>&lt;LinkInline&gt;</code></SFI.Label>
      <HdsFormHelperText>This is a helper text
        <HdsLinkInline @route="index">with a link</HdsLinkInline></HdsFormHelperText>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>&lt;LinkInline&gt;</code>
        and
        <code>secondary</code>
        color</SFI.Label>
      <HdsFormHelperText>This is a helper text
        <HdsLinkInline @route="index" @color="secondary">with a secondary link</HdsLinkInline></HdsFormHelperText>
    </SF.Item>
    <SF.Item @label="With structured content (eg. HTML tags)">
      <HdsFormHelperText>
        A helper text may contain some
        <code>&lt;code&gt;</code>
        for example, or a
        <strong>&lt;strong&gt;</strong>.
      </HdsFormHelperText>
    </SF.Item>
    <SF.Item @label="With text that spans multiple lines">
      <ShwOutliner {{style max-width="250px"}}>
        <HdsFormHelperText>This is a very long helper text that should go on
          multiple lines</HdsFormHelperText>
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />

  <ShwTextH2>Indicator</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="isRequired">
      <HdsFormIndicator @isRequired={{true}} />
    </SF.Item>
    <SF.Item @label="isOptional">
      <HdsFormIndicator @isOptional={{true}} />
    </SF.Item>
    <SF.Item @label="No arguments">
      <HdsFormIndicator />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />

  <ShwTextH2>Character count</ShwTextH2>

  <ShwTextH3>Default content</ShwTextH3>

  <ShwTextBody>Base</ShwTextBody>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="currentLength = 0">
      <CodeFragmentWithCharacterCount @ariaLabel="currentLength = 0" />
    </SG.Item>
    <SG.Item @label="currentLength > 0">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength > 0"
        @value="cl"
      />
    </SG.Item>
  </ShwGrid>

  <ShwTextBody>maxLength</ShwTextBody>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="currentLength = 0">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength = 0"
        @maxLength={{25}}
      />
    </SG.Item>
    <SG.Item @label="currentLength < maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength < maxLength"
        @maxLength={{25}}
        @value="cluster"
      />
    </SG.Item>
    <SG.Item @label="currentLength = maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength = maxLength"
        @maxLength={{25}}
        @value="cluster-length-is-longer-"
      />
    </SG.Item>
    <SG.Item @label="currentLength > maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength > maxLength"
        @maxLength={{25}}
        @value="cluster-length-is-longer-than"
      />
    </SG.Item>
  </ShwGrid>

  <ShwTextBody>minLength</ShwTextBody>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="currentLength = 0">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength = 0"
        @minLength={{3}}
      />
    </SG.Item>
    <SG.Item @label="currentLength < maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength < maxLength"
        @minLength={{3}}
        @value="c"
      />
    </SG.Item>
    <SG.Item @label="currentLength >= minLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength >= minLength"
        @minLength={{3}}
        @value="clu"
      />
    </SG.Item>
    <SG.Item />
  </ShwGrid>

  <ShwTextBody>minLength + maxLength</ShwTextBody>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="currentLength = 0">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength = 0"
        @minLength={{3}}
        @maxLength={{25}}
      />
    </SG.Item>
    <SG.Item @label="currentLength < minLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength < minLength"
        @minLength={{3}}
        @maxLength={{25}}
        @value="c"
      />
    </SG.Item>
    <SG.Item @label="minLength <= currentLength <= maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="minLength <= currentLength <= maxLength"
        @minLength={{3}}
        @maxLength={{25}}
        @value="cluster"
      />
    </SG.Item>
    <SG.Item @label="currentLength > maxLength">
      <CodeFragmentWithCharacterCount
        @ariaLabel="currentLength > maxLength"
        @minLength={{3}}
        @maxLength={{25}}
        @value="cluster-length-is-longer-than"
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Custom content</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With custom content">
      <CodeFragmentWithCharacterCount
        @ariaLabel="with custom content"
        @minLength={{20}}
        @maxLength={{40}}
        @customContent={{true}}
        @value="Lorem ipsum dolor"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />

  <ShwTextH2>Error</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With simple text">
      <HdsFormError>This is a simple error message</HdsFormError>
    </SF.Item>
    <SF.Item @label="With text that spans multiple lines">
      <ShwOutliner {{style width="250px"}}>
        <HdsFormError>This is a very long error message that should span on
          multiple lines</HdsFormError>
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="With multiple error messages">
      <HdsFormError as |Error|>
        <Error.Message>First error message</Error.Message>
        <Error.Message>Second error message</Error.Message>
      </HdsFormError>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />

  <ShwTextH2>Legend</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With simple text">
      <HdsFormLegend>This is a simple legend</HdsFormLegend>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With <code>&lt;LinkInline&gt;</code></SFI.Label>
      <HdsFormLegend>This is a legend
        <HdsLinkInline @route="index">with a link</HdsLinkInline></HdsFormLegend>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>&lt;LinkInline&gt;</code>
        and
        <code>secondary</code>
        color</SFI.Label>
      <HdsFormLegend>This is a legend
        <HdsLinkInline @route="index" @color="secondary">with a secondary link</HdsLinkInline></HdsFormLegend>
    </SF.Item>
    <SF.Item @label="With required indicator">
      <HdsFormLegend @isRequired={{true}}>This is a simple legend</HdsFormLegend>
    </SF.Item>
    <SF.Item @label="With optional indicator">
      <HdsFormLegend @isOptional={{true}}>This is a simple legend</HdsFormLegend>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>)
      </SFI.Label>
      <HdsFormLegend>
        <div class="shw-component-form-base-elements-container-with-badge">This
          is the legend
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </div>
      </HdsFormLegend>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and required indicator
      </SFI.Label>
      <div class="shw-component-form-base-elements-container-with-badge">
        <HdsFormLegend @isRequired={{true}}>
          This is the legend
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </HdsFormLegend>
      </div>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and optional indicator
      </SFI.Label>
      <div class="shw-component-form-base-elements-container-with-badge">
        <HdsFormLegend @isOptional={{true}}>
          This is the legend
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </HdsFormLegend>
      </div>
    </SF.Item>
    <SF.Item @label="With text that spans multiple lines">
      <ShwOutliner
        class="shw-component-form-base-elements-container-with-badge"
        {{style max-width="250px"}}
      >
        <HdsFormLegend>This is a very long legend text that should go on
          multiple lines</HdsFormLegend>
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="With text that spans multiple lines and required indicator"
    >
      <ShwOutliner
        class="shw-component-form-base-elements-container-with-badge"
        {{style max-width="250px"}}
      >
        <HdsFormLegend @isRequired={{true}}>This is a very long legend text that
          should go on multiple lines</HdsFormLegend>
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="With text that spans multiple lines and optional indicator"
    >
      <ShwOutliner
        class="shw-component-form-base-elements-container-with-badge"
        {{style max-width="250px"}}
      >
        <HdsFormLegend @isOptional={{true}}>This is a very long legend text that
          should go on multiple lines</HdsFormLegend>
      </ShwOutliner>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With text that spans multiple lines, structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and required indicator
      </SFI.Label>
      <ShwOutliner
        class="shw-component-form-base-elements-container-with-badge"
        {{style max-width="250px"}}
      >
        <HdsFormLegend @isRequired={{true}}>
          This is a very long legend text that should go on multiple lines
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </HdsFormLegend>
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />

  <ShwTextH2>Visibility toggle</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="On">
      <ShwOutliner>
        <HdsFormVisibilityToggle @isVisible={{true}} aria-label="is-visible" />
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="Off">
      <ShwOutliner>
        <HdsFormVisibilityToggle
          @isVisible={{false}}
          aria-label="is-not-visible"
        />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionBaseElements;
