/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import NOOP from 'showcase/utils/noop';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsCodeEditorDescription,
  HdsCodeEditorFullScreenButton,
  HdsCodeEditorTitle,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>BaseElements</ShwTextH2>

  <ShwTextH3>CodeEditorTitle</ShwTextH3>

  <div class="hds-code-editor" {{style padding="16px"}}>
    <HdsCodeEditorTitle @editorId="example-editor" @onInsert={{NOOP}}>
      Code editor with title
    </HdsCodeEditorTitle>
  </div>

  <ShwTextH3>CodeEditorDescription</ShwTextH3>

  <div class="hds-code-editor" {{style padding="16px"}}>
    <HdsCodeEditorDescription @editorId="example-editor" @onInsert={{NOOP}}>
      This is a code editor with a description
    </HdsCodeEditorDescription>
  </div>

  <ShwTextH3>CodeEditorFullScreenButton</ShwTextH3>

  <ShwFlex as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{state}}>
        <div class="hds-code-editor" {{style padding="16px"}}>
          <ShwFlex as |SFI|>
            <SFI.Item>
              <HdsCodeEditorFullScreenButton
                @isFullScreen={{false}}
                @onToggleFullScreen={{NOOP}}
                mock-state-value={{state}}
              />
            </SFI.Item>
            <SFI.Item>
              <HdsCodeEditorFullScreenButton
                @isFullScreen={{true}}
                @onToggleFullScreen={{NOOP}}
                mock-state-value={{state}}
              />
            </SFI.Item>
          </ShwFlex>
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  {{!-- <ShwTextH3>CodeEditorGeneric</ShwTextH3>

  <div class="hds-code-editor" {{style padding="16px"}}>
    <HdsCodeEditorGeneric>
      <ShwPlaceholder @text="generic content" @height="24" />
    </HdsCodeEditorGeneric>
  </div> --}}
</template>;

export default SubSectionBaseElements;
