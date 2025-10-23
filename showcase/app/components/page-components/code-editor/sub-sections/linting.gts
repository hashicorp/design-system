/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { Diagnostic as DiagnosticType } from '@codemirror/lint';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

const BAD_JSON_CODE = `{
  message: "Hello, world!",
  : "success"
  "data": null,
}`;

export default class SubSectionLinting extends Component {
  handleLint = (diagnostics: DiagnosticType[], value: string) => {
    console.group('Linting Results');
    console.log('Diagnostics:', diagnostics);
    console.log('Value:', value);
    console.groupEnd();
  };

  <template>
    <ShwTextH2>Linting</ShwTextH2>
    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="JSON with linting">
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
  </template>
}
