/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';
import NOOP from 'showcase/utils/noop';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsButton,
  HdsCodeEditor,
  HdsCodeEditorFullScreenButton,
} from '@hashicorp/design-system-components/components';
import type { Diagnostic as DiagnosticType } from '@hashicorp/design-system-components/codemirror';

const STATES = ['default', 'hover', 'active', 'focus'];

const DEMO_CODE = `lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

const MULTI_LINE_CODE = `package main

import 'fmt'

func main() {
  res = 'Lorem ipsum dolor sit amet'
  fmt.Println(res)
}`;

const BAD_JSON_CODE = `{
  message: "Hello, world!",
  : "success"
  "data": null,
}`;

export default class CodeEditorCarbonizationIndex extends Component {
  handleLint = (diagnostics: DiagnosticType[], value: string) => {
    console.group('Linting Results');
    console.log('Diagnostics:', diagnostics);
    console.log('Value:', value);
    console.groupEnd();
  };

  <template>
    {{pageTitle "CodeEditor - Carbonization"}}

    <ShwTextH1>CodeEditor - Carbonization</ShwTextH1>

    <ShwTextBody>Note: There is no direct Carbon equivalent to the CodeEditor
      component, but the closest match is the code-snippet component.</ShwTextBody>

    <section>

      <ShwTextH2>Content</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCodeEditor @ariaLabel="No content" />
            </SF.Item>
            <SF.Item>
              <HdsCodeEditor
                @ariaLabel="With initial content"
                @value={{DEMO_CODE}}
              />
            </SF.Item>
            <SF.Item>
              <HdsCodeEditor
                @ariaLabel="With initial content"
                @language="go"
                @value={{MULTI_LINE_CODE}}
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              {{! prettier-ignore }}
              <cds-code-snippet type="multi"></cds-code-snippet>
            </SF.Item>
            <SF.Item>
              {{! prettier-ignore }}
              <cds-code-snippet type="multi">{{DEMO_CODE}}</cds-code-snippet>
            </SF.Item>
            <SF.Item>
              {{! prettier-ignore }}
              <cds-code-snippet type="multi">{{MULTI_LINE_CODE}}</cds-code-snippet>
            </SF.Item>
          </ShwFlex>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Title and Description</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCodeEditor as |CE|>
                <CE.Title>Code editor with title</CE.Title>
              </HdsCodeEditor>
            </SF.Item>
            <SF.Item>
              <HdsCodeEditor @ariaLabel="With description" as |CE|>
                <CE.Description>This is a code editor with a description</CE.Description>
              </HdsCodeEditor>
            </SF.Item>
            <SF.Item>
              <HdsCodeEditor as |CE|>
                <CE.Title>Code editor with title</CE.Title>
                <CE.Description>This is a code editor with a description</CE.Description>
              </HdsCodeEditor>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Copy Button</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCodeEditor
                @ariaLabel="With copy button"
                @language="go"
                @value={{MULTI_LINE_CODE}}
                @hasCopyButton={{true}}
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              {{! prettier-ignore }}
              <cds-code-snippet type="multi" copy-button-description="Copy code">{{MULTI_LINE_CODE}}</cds-code-snippet>
            </SF.Item>
          </ShwFlex>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Fullscreen Toggle</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCodeEditor
                @ariaLabel="With fullscreen toggle"
                @language="go"
                @value={{MULTI_LINE_CODE}}
                @hasFullScreenButton={{true}}
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Complex content</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCodeEditor
                @ariaLabel="With complex content"
                @language="go"
                @value={{MULTI_LINE_CODE}}
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
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Linting</ShwTextH2>

      <ShwCarbonizationComparisonGrid @layout="side-by-side">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCodeEditor
                @language="json"
                @value={{BAD_JSON_CODE}}
                @isLintingEnabled={{true}}
                @hasFullScreenButton={{true}}
                @onLint={{this.handleLint}}
                as |CE|
              >
                <CE.Title>JSON with linting</CE.Title>
              </HdsCodeEditor>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Base elements</ShwTextH2>

      <ShwTextH3>FullScreenButton</ShwTextH3>

      {{#each STATES as |state|}}
        <ShwCarbonizationComparisonGrid @label={{state}}>
          <:theming>
            <div class="hds-code-editor" {{style padding="16px"}}>
              <ShwFlex as |SF|>
                <SF.Item>
                  <HdsCodeEditorFullScreenButton
                    @isFullScreen={{false}}
                    @onToggleFullScreen={{NOOP}}
                    mock-state-value={{state}}
                  />
                </SF.Item>
                <SF.Item>
                  <HdsCodeEditorFullScreenButton
                    @isFullScreen={{true}}
                    @onToggleFullScreen={{NOOP}}
                    mock-state-value={{state}}
                  />
                </SF.Item>
              </ShwFlex>
            </div>
          </:theming>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    </section>
  </template>
}
