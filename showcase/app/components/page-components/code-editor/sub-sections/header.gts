/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsCodeEditor,
  HdsButton,
} from '@hashicorp/design-system-components/components';

const SubSectionHeader: TemplateOnlyComponent = <template>
  <ShwTextH2>Header</ShwTextH2>

  <ShwTextH3>Title and description</ShwTextH3>
  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="With title">
      <HdsCodeEditor as |CE|>
        <CE.Title>Code editor with title</CE.Title>
      </HdsCodeEditor>
    </SG.Item>
    <SG.Item @label="With description">
      <HdsCodeEditor @ariaLabel="With description" as |CE|>
        <CE.Description>This is a code editor with a description</CE.Description>
      </HdsCodeEditor>
    </SG.Item>
    <SG.Item @label="With title and description">
      <HdsCodeEditor as |CE|>
        <CE.Title>Code editor with title</CE.Title>
        <CE.Description>This is a code editor with a description</CE.Description>
      </HdsCodeEditor>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>Custom content</ShwTextH3>
  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="With custom content">
      <HdsCodeEditor @ariaLabel="With custom content" as |CE|>
        <CE.Generic>
          <ShwPlaceholder @text="generic content" @height="24" />
        </CE.Generic>
      </HdsCodeEditor>
    </SG.Item>
    <SG.Item @label="With custom content and title">
      <HdsCodeEditor as |CE|>
        <CE.Title>Code editor with custom content and title</CE.Title>
        <CE.Generic>
          <ShwPlaceholder @text="generic content" @height="24" />
        </CE.Generic>
      </HdsCodeEditor>
    </SG.Item>
    <SG.Item @label="With custom content and description">
      <HdsCodeEditor @ariaLabel="With custom content and description" as |CE|>
        <CE.Description>Description for code editor with custom content and
          description</CE.Description>
        <CE.Generic>
          <ShwPlaceholder @text="generic content" @height="24" />
        </CE.Generic>
      </HdsCodeEditor>
    </SG.Item>
    <SG.Item @label="With custom content, title, and description">
      <HdsCodeEditor as |CE|>
        <CE.Title>Code editor with custom content, title, and description</CE.Title>
        <CE.Description>Description for code editor with custom content, title,
          and description</CE.Description>
        <CE.Generic>
          <ShwPlaceholder @text="generic content" @height="24" />
        </CE.Generic>
      </HdsCodeEditor>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>Actions</ShwTextH3>
  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="Fullscreen toggle">
      <HdsCodeEditor
        @ariaLabel="Fullscreen toggle"
        @hasFullScreenButton={{true}}
      />
    </SG.Item>
    <SG.Item @label="Copy button">
      <HdsCodeEditor
        @ariaLabel="Copy button"
        @value="Copy me!"
        @hasCopyButton={{true}}
      />
    </SG.Item>
    <SG.Item @label="Fullscreen toggle and copy button">
      <HdsCodeEditor
        @ariaLabel="Fullscreen toggle and copy button"
        @hasFullScreenButton={{true}}
        @hasCopyButton={{true}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>Complex example</ShwTextH3>
  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="With title, description, internal actions, and custom content"
    >
      <HdsCodeEditor
        @hasFullScreenButton={{true}}
        @hasCopyButton={{true}}
        as |CE|
      >
        <CE.Title>Code editor with title</CE.Title>
        <CE.Description>This is a code editor with a description</CE.Description>
        <CE.Generic class="my-code-editor-custom-content">
          <HdsButton @text="Custom action" @size="small" />
          <HdsButton
            @text="Search"
            @icon="search"
            @isIconOnly={{true}}
            @size="small"
          />
        </CE.Generic>
      </HdsCodeEditor>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionHeader;
