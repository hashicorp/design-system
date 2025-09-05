import Component from '@glimmer/component';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { get } from '@ember/object';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsCopyButton,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

import CopyButtonWithMaskedInput, {
  MASKED_INPUT_VARIANTS,
} from 'showcase/components/page-components/copy/button/code-fragments/with-masked-input';
import type { CodeFragmentWithMaskedInputSignature } from 'showcase/components/page-components/copy/button/code-fragments/with-masked-input';
import CopyButtonWithHdsInput, {
  INPUT_COMPONENTS,
} from 'showcase/components/page-components/copy/button/code-fragments/with-hds-input';
import CopyButtonWithModal from 'showcase/components/page-components/copy/button/code-fragments/with-modal';
import CopyButtonWithGenericDialogContent from 'showcase/components/page-components/copy/button/code-fragments/with-generic-dialog-content';
import CopyButtonWithHTMLInput, {
  INPUT_COMPONENTS as HTML_INPUT_COMPONENTS,
} from 'showcase/components/page-components/copy/button/code-fragments/with-html-input';

const maskedInputVariantToLabelMap: Record<
  CodeFragmentWithMaskedInputSignature['Args']['variant'],
  string
> = {
  'masked-input-base': 'With MaskedInputBase',
  'masked-input-base-form-field': 'With FormField + MaskedInputBase',
  'masked-input-field': 'With MaskedInputField',
};

export default class SubSectionDemos extends Component {
  get targetNodeElement() {
    const element = document.querySelector('#test-target-node-element');
    if (!element) {
      return undefined;
    }

    return element as HTMLElement;
  }

  // DEBUG
  // uncomment these if you need to debug the `onSuccess/onError` callback methods

  // onSucces = () => ({
  //   trigger,
  //   text,
  //   target,
  // }: {
  //   trigger: HTMLElement;
  //   text: string;
  //   target: string;
  // }) {
  //   console.log('onSuccess invoked in the controller', trigger, text, target);
  // }

  // onError = () => ({
  //   trigger,
  //   text,
  //   target,
  // }: {
  //   trigger: HTMLElement;
  //   text: string;
  //   target: string;
  // }) {
  //   console.log('onError invoked in the controller', trigger, text, target);
  // }

  <template>
    <ShwTextH2>Compositions</ShwTextH2>

    {{#each MASKED_INPUT_VARIANTS as |variant|}}
      <ShwFlex as |SF|>
        {{#let (array false true) as |isMultilineOptions|}}
          {{#each isMultilineOptions as |isMultiline|}}
            <SF.Item @label={{get maskedInputVariantToLabelMap variant}}>
              <CopyButtonWithMaskedInput
                @variant={{variant}}
                @isMultiline={{isMultiline}}
              />
            </SF.Item>
          {{/each}}
        {{/let}}
      </ShwFlex>
    {{/each}}

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
          @textToCopy={{BigInt 12345678910}}
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
      {{#each INPUT_COMPONENTS as |inputComponent|}}
        <SG.Item @label={{"{{capitalize inputComponent}} component"}}>
          <CopyButtonWithHdsInput @inputComponent={{inputComponent}} />
        </SG.Item>
        {{#unless (eq inputComponent "select")}}
          <SG.Item @label="{{capitalize inputComponent}} component (readonly)">
            <CopyButtonWithHdsInput
              @inputComponent={{inputComponent}}
              @isReadOnly={{true}}
            />
          </SG.Item>
        {{/unless}}
        <SG.Item @label="{{capitalize inputComponent}} component (disabled)">
          <CopyButtonWithHdsInput
            @inputComponent={{inputComponent}}
            @isDisabled={{true}}
          />
        </SG.Item>
      {{/each}}
    </ShwGrid>

    <ShwGrid @columns={{3}} @gap="2rem" as |SG|>
      <SG.Item @label="Within a Dropdown">
        <HdsDropdown @listPosition="bottom-left" as |dd|>
          <dd.ToggleButton @text="Open menu" />
          <dd.Generic>
            <CopyButtonWithGenericDialogContent />
          </dd.Generic>
        </HdsDropdown>
      </SG.Item>
      <SG.Item @label="Within a Modal">
        <CopyButtonWithModal />
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
          >&lt;h1&gt;A page header example&lt;/h1&gt; &lt;p&gt;Some paragraph
            text also&lt;/p&gt;</code></pre>
      </SG.Item>
      <SG.Item @label="Code block with 'contenteditable'">
        <HdsCopyButton
          @text="Edit and copy the code block"
          @targetToCopy="#test-code-block-editable"
        />
        <pre class="shw-component-copy-button-code-block"><code
            id="test-code-block-editable"
            contenteditable="true"
          >&lt;h1&gt;A page header example&lt;/h1&gt; &lt;p&gt;Some paragraph
            text also&lt;/p&gt;</code></pre>
      </SG.Item>
    </ShwGrid>

    <ShwTextH4>HTML input elements</ShwTextH4>
    <ShwFlex @gap="2rem" as |SF|>
      {{#each HTML_INPUT_COMPONENTS as |inputComponent|}}
        <SF.Item @label="{{capitalize inputComponent}} input">
          <CopyButtonWithHTMLInput @inputComponent={{inputComponent}} />
        </SF.Item>
      {{/each}}
    </ShwFlex>
  </template>
}
