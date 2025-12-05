/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { capitalize } from '@ember/string';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsCopyButton,
  HdsDropdown,
  HdsFormMaskedInputBase,
  HdsFormField,
  HdsFormMaskedInputField,
  HdsFormTextInputField,
  HdsFormTextareaBase,
  HdsFormSelectBase,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithModal from 'showcase/components/page-components/copy/button/code-fragments/with-modal';
import CodeFragmentWithGenericDialogContent from 'showcase/components/page-components/copy/button/code-fragments/with-generic-dialog-content';
import CodeFragmentWithHtmlInput, {
  INPUT_COMPONENTS as HTML_INPUT_COMPONENTS,
} from 'showcase/components/page-components/copy/button/code-fragments/with-html-input';

export default class SubSectionDemos extends Component {
  bigIntValue = BigInt(12345678910);

  get targetNodeElement() {
    const element = document.querySelector('#test-target-node-element');
    if (!element) {
      return undefined;
    }

    return element as HTMLElement;
  }

  <template>
    <ShwTextH2>Compositions</ShwTextH2>

    <ShwFlex as |SF|>
      <SF.Item @label="With MaskedInput::Base">
        <div class="shw-component-copy-button-composition-masked-input-base">
          <HdsFormMaskedInputBase
            @value="Lorem ipsum dolor"
            aria-label="With MaskedInput::Base"
          />
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy"
            @textToCopy="Lorem ipsum dolor"
          />
        </div>
      </SF.Item>
      <SF.Item @label="With MaskedInput::Base (multiline)">
        <div class="shw-component-copy-button-composition-masked-input-base">
          <HdsFormMaskedInputBase
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            aria-label="With MaskedInput::Base"
          />
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy"
            @textToCopy="Lorem ipsum dolor"
          />
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwFlex as |SF|>
      <SF.Item @label="With Form::Field + MaskedInput::Base">
        <HdsFormField @layout="vertical" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control>
            <div
              class="shw-component-copy-button-composition-masked-input-base"
            >
              <HdsFormMaskedInputBase
                @value="Lorem ipsum dolor"
                aria-label="With MaskedInput::Base"
              />
              <HdsCopyButton
                @isIconOnly={{true}}
                @text="Copy"
                @textToCopy="Lorem ipsum dolor"
              />
            </div>
          </F.Control>
        </HdsFormField>
      </SF.Item>
      <SF.Item @label="With Form::Field + MaskedInput::Base (multiline)">
        <HdsFormField @layout="vertical" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Control>
            <div
              class="shw-component-copy-button-composition-masked-input-base"
            >
              <HdsFormMaskedInputBase
                @isMultiline={{true}}
                @value="Lorem ipsum dolor"
                aria-label="With MaskedInput::Base"
              />
              <HdsCopyButton
                @isIconOnly={{true}}
                @text="Copy"
                @textToCopy="Lorem ipsum dolor"
              />
            </div>
          </F.Control>
        </HdsFormField>
      </SF.Item>
    </ShwFlex>

    <ShwFlex as |SF|>
      <SF.Item @label="With MaskedInput::Field">
        <div class="shw-component-copy-button-composition-masked-input-field">
          <HdsFormMaskedInputField @value="Lorem ipsum dolor" as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </HdsFormMaskedInputField>
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy"
            @textToCopy="Lorem ipsum dolor"
          />
        </div>
      </SF.Item>
      <SF.Item @label="With MaskedInput::Field (multiline)">
        <div class="shw-component-copy-button-composition-masked-input-field">
          <HdsFormMaskedInputField
            @value="Lorem ipsum dolor"
            @isMultiline={{true}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </HdsFormMaskedInputField>
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy"
            @textToCopy="Lorem ipsum dolor"
          />
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwDivider />

    <ShwTextH2>Demo</ShwTextH2>

    <ShwTextH3>With <code>text</code> as argument</ShwTextH3>

    <ShwFlex as |SF|>
      <SF.Item>
        <HdsCopyButton
          @text="Copy a secret key"
          @textToCopy="someSecretThingGoesHere"
        />
      </SF.Item>
      <SF.Item>
        {{! context: https://github.com/hashicorp/design-system/pull/1564 }}
        <HdsCopyButton @text="Copy a number" @textToCopy={{123456789}} />
      </SF.Item>
      <SF.Item>
        <HdsCopyButton
          @text="Copy a Bigint number"
          @textToCopy={{this.bigIntValue}}
        />
      </SF.Item>
    </ShwFlex>

    <ShwTextH4>Special cases</ShwTextH4>

    <ShwFlex as |SF|>
      <SF.Item>
        <HdsCopyButton @text="Copy an empty string" @textToCopy="" />
      </SF.Item>
      <SF.Item>
        <HdsCopyButton @text="Copy the number '0'" @textToCopy={{0}} />
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>With <code>target</code> element</ShwTextH3>

    <ShwTextH4>Target types</ShwTextH4>

    <ShwFlex @gap="2rem" as |SF|>
      <SF.Item @label="Target as a CSS selector (string)">
        <div class="shw-component-copy-button-flex-container">
          <p class="shw-text-body" id="test-target-string">Lorem ipsum dolor</p>
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy the content in the node"
            @targetToCopy="#test-target-string"
          />
        </div>
      </SF.Item>
      <SF.Item @label="Target as a DOM element (Node)">
        <div class="shw-component-copy-button-flex-container">
          <p class="shw-text-body" id="test-target-node-element">Lorem ipsum
            dolor</p>
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy the content in the node"
            @targetToCopy={{this.targetNodeElement}}
          />
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwTextH4>HDS components</ShwTextH4>

    <ShwGrid @columns={{3}} @gap="2rem" as |SG|>
      <SG.Item
        @label="Input component"
        class="shw-component-copy-button-input-component"
      >
        <HdsFormTextInputField
          @value="036140285924"
          name="test-input"
          @id="test-input"
          as |F|
        >
          <F.Label>Input Label</F.Label>
        </HdsFormTextInputField>
        <HdsCopyButton
          @text="Copy the input value"
          @targetToCopy="#test-input"
        />
      </SG.Item>
      <SG.Item
        @label="Input component (readonly)"
        class="shw-component-copy-button-input-component"
      >
        <HdsFormTextInputField
          readonly
          @value="036140285924-readonly"
          name="test-input-readonly"
          @id="test-input-readonly"
          as |F|
        >
          <F.Label>Input Label</F.Label>
        </HdsFormTextInputField>
        <HdsCopyButton
          @text="Copy the input value"
          @targetToCopy="#test-input-readonly"
        />
      </SG.Item>
      <SG.Item
        @label="Input component (disabled)"
        class="shw-component-copy-button-input-component"
      >
        <HdsFormTextInputField
          disabled
          @value="036140285924-disabled"
          name="test-input-disabled"
          @id="test-input-disabled"
          as |F|
        >
          <F.Label>Input Label</F.Label>
        </HdsFormTextInputField>
        <HdsCopyButton
          @text="Copy the input value"
          @targetToCopy="#test-input-disabled"
        />
      </SG.Item>
      <SG.Item @label="Textarea component">
        <div class="shw-component-copy-button-flex-container">
          <HdsFormTextareaBase
            @value="This is a normal
multiline text
that should be copied"
            name="test-textarea"
            aria-label="With Textarea::Base"
            id="test-textarea"
          />
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy the textarea value"
            @targetToCopy="#test-textarea"
          />
        </div>
      </SG.Item>
      <SG.Item @label="Textarea component (readonly)">
        <div class="shw-component-copy-button-flex-container">
          <HdsFormTextareaBase
            readonly
            @value="This is a readonly
multiline text
that should be copied"
            name="test-textarea-readonly"
            aria-label="readonly"
            id="test-textarea-readonly"
          />
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy the textarea value"
            @targetToCopy="#test-textarea-readonly"
          />
        </div>
      </SG.Item>
      <SG.Item @label="Textarea component (disabled)">
        <div class="shw-component-copy-button-flex-container">
          <HdsFormTextareaBase
            disabled
            @value="This is a disabled
multiline text
that should be copied"
            name="test-textarea-disabled"
            aria-label="Textarea disabled"
            id="test-textarea-disabled"
          />
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy the textarea value"
            @targetToCopy="#test-textarea-disabled"
          />
        </div>
      </SG.Item>
      <SG.Item @label="Select component">
        <div class="shw-component-copy-button-flex-container">
          <HdsFormSelectBase
            name="test-select"
            id="test-select"
            aria-label="Select"
            as |C|
          >
            <C.Options>
              <option>Lorem ipsum dolor</option>
              <option selected>Sit amet</option>
              <option>Consectetur adipiscing elit</option>
            </C.Options>
          </HdsFormSelectBase>
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy the textarea value"
            @targetToCopy="#test-select"
          />
        </div>
      </SG.Item>
      <SG.Item @label="Select component (disabled)">
        <div class="shw-component-copy-button-flex-container">
          <HdsFormSelectBase
            disabled
            name="test-select-disabled"
            aria-label="Select disabled"
            id="test-select-disabled"
            as |C|
          >
            <C.Options>
              <option>Lorem ipsum dolor</option>
              <option>Sit amet</option>
              <option selected>Consectetur adipiscing elit</option>
            </C.Options>
          </HdsFormSelectBase>
          <HdsCopyButton
            @isIconOnly={{true}}
            @text="Copy the textarea value"
            @targetToCopy="#test-select-disabled"
          />
        </div>
      </SG.Item>
    </ShwGrid>

    <ShwGrid @columns={{3}} @gap="2rem" as |SG|>
      <SG.Item @label="Within a Dropdown">
        <HdsDropdown @listPosition="bottom-left" as |dd|>
          <dd.ToggleButton @text="Open menu" />
          <dd.Generic>
            <CodeFragmentWithGenericDialogContent />
          </dd.Generic>
        </HdsDropdown>
      </SG.Item>
      <SG.Item @label="Within a Modal">
        <CodeFragmentWithModal />
      </SG.Item>
    </ShwGrid>

    <ShwTextH4>HTML blocks</ShwTextH4>
    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      <SG.Item @label="Structured content">
        <HdsCopyButton
          @text="Copy the content below"
          @targetToCopy="#test-structured-content"
        />
        <ul
          class="shw-component-copy-structured-content"
          id="test-structured-content"
        >
          <li class="shw-text-body">
            <p>This whole list is the
              <span><strong>target</strong>
                <em>element</em></span></p>
          </li>
          <li class="shw-text-body">
            <p>The button will
              <code>copy</code>
              the
              <a href="#">text</a>
              in this
              <cite>target</cite>
              element.</p>
          </li>
        </ul>
      </SG.Item>
      <SG.Item @label="With hidden content">
        <HdsCopyButton
          @text="Copy the content below"
          @targetToCopy="#test-hidden-content"
        />
        <p class="shw-text-body" id="test-hidden-content">This paragraph
          contains some
          <strong class="shw-component-copy-button-display-none">not</strong>
          hidden content
          <strong class="shw-component-copy-button-visibility-hidden">, or not?</strong>
        </p>
      </SG.Item>
    </ShwGrid>

    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      <SG.Item @label="Code block">
        <HdsCopyButton
          @text="Copy the code block"
          @targetToCopy="#test-code-block"
        />
        <pre class="shw-component-copy-button-code-block"><code
            id="test-code-block"
          >&lt;h1&gt;A page header example&lt;/h1&gt;
            <br />&lt;p&gt;Some paragraph text also&lt;/p&gt;</code></pre>
      </SG.Item>
      <SG.Item @label="Code block with 'contenteditable'">
        <HdsCopyButton
          @text="Edit and copy the code block"
          @targetToCopy="#test-code-block-editable"
        />
        <pre class="shw-component-copy-button-code-block"><code
            id="test-code-block-editable"
            contenteditable="true"
          >&lt;h1&gt;A page header example&lt;/h1&gt;
            <br />&lt;p&gt;Some paragraph text also&lt;/p&gt;</code></pre>
      </SG.Item>
    </ShwGrid>

    <ShwTextH4>HTML input elements</ShwTextH4>
    <ShwFlex @gap="2rem" as |SF|>
      {{#each HTML_INPUT_COMPONENTS as |inputComponent|}}
        <SF.Item @label="{{capitalize inputComponent}} input">
          <CodeFragmentWithHtmlInput @inputComponent={{inputComponent}} />
        </SF.Item>
      {{/each}}
    </ShwFlex>
  </template>
}
