import Component from '@glimmer/component';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwGrid from 'showcase/components/shw/grid';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH4 from 'showcase/components/shw/text/h4';

// HDS Components
import { HdsCopyButton } from '@hashicorp/design-system-components/components';

import CopyButtonTargetsHtmlInput, {
  HTML_INPUT_COMPONENTS,
} from 'showcase/components/mock/components/copy/button/targets/html-input';
import CopyButtonTargetsHdsInput, {
  HDS_INPUT_COMPONENTS,
} from 'showcase/components/mock/components/copy/button/targets/hds-input';
import CopyButtonTargetsDropdown from 'showcase/components/mock/components/copy/button/targets/dropdown';
import CopyButtonTargetsModal from 'showcase/components/mock/components/copy/button/targets/modal';

export default class CopyButtonTargets extends Component {
  get targetNodeElement() {
    const element = document.querySelector('#test-target-node-element');
    if (!element) {
      return undefined;
    }

    return element as HTMLElement;
  }

  <template>
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
      {{#each HDS_INPUT_COMPONENTS as |inputComponent|}}
        <SG.Item @label={{capitalize inputComponent}}>
          <CopyButtonTargetsHdsInput @inputComponent={{inputComponent}} />
        </SG.Item>
        {{#unless (eq inputComponent "select")}}
          <SG.Item @label="{{capitalize inputComponent}} (readonly)">
            <CopyButtonTargetsHdsInput
              @inputComponent={{inputComponent}}
              @isReadOnly={{true}}
            />
          </SG.Item>
        {{/unless}}
        <SG.Item @label="{{capitalize inputComponent}} (disabled)">
          <CopyButtonTargetsHdsInput
            @inputComponent={{inputComponent}}
            @isDisabled={{true}}
          />
        </SG.Item>
      {{/each}}
    </ShwGrid>

    <ShwGrid @columns={{3}} @gap="2rem" as |SG|>
      <SG.Item @label="Within a Dropdown">
        <CopyButtonTargetsDropdown />
      </SG.Item>
      <SG.Item @label="Within a Modal">
        <CopyButtonTargetsModal />
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
          <CopyButtonTargetsHtmlInput @inputComponent={{inputComponent}} />
        </SF.Item>
      {{/each}}
    </ShwFlex>
  </template>
}
