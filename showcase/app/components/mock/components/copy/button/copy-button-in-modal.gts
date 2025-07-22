import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

// HDS Components
import {
  HdsButton,
  HdsButtonSet,
  HdsCopyButton,
  HdsFormTextInputBase,
  HdsModal,
} from '@hashicorp/design-system-components/components';

// SHW components
import ShwDivider from 'showcase/components/shw/divider';

export default class CopyButtonInModal extends Component {
  @tracked isModalOpen = false;

  @action
  openModal() {
    this.isModalOpen = true;
  }

  @action
  closeModal() {
    this.isModalOpen = false;
  }

  <template>
    <HdsButton
      @color="secondary"
      @text="Open modal"
      {{on "click" this.openModal}}
    />
    {{#if this.isModalOpen}}
      <HdsModal id="test-copy-button-modal" @onClose={{this.closeModal}} as |M|>
        <M.Header>
          Lorem ipsum dolor
        </M.Header>
        <M.Body>
          <form
            name="test-copy-button-modal-form"
            class="shw-component-copy-button-demo-container"
          >
            <p class="shw-text-h4">With HDS components</p>
            <p class="shw-text-body">Input</p>
            <div class="shw-component-copy-button-demo-flex-container">
              <HdsFormTextInputBase
                name="test-modal-text-input"
                id="test-modal-text-input"
                @value="Lorem ipsum dolor"
              />
              <HdsCopyButton
                @isIconOnly={{true}}
                @text="Copy the text input value"
                @targetToCopy="#test-modal-text-input"
              />
            </div>
            <ShwDivider @level={{2}} />
            <p class="shw-text-h4">With HTML blocks</p>
            <p class="shw-text-body">Structured content</p>
            <div class="shw-component-copy-button-demo-flex-container">
              <p
                class="shw-component-copy-button-demo-paragraph"
                id="test-modal-structured-content"
              >This is the
                <span><strong>some</strong>
                  <em>structured</em></span>
                content that will be
                <a href="#">targeted</a>
                by the
                <code>button</code>.</p>
              <HdsCopyButton
                @isIconOnly={{true}}
                @text="Copy the structured content"
                @targetToCopy="#test-modal-structured-content"
              />
            </div>
            <p class="shw-text-body">Code block with 'contentEditable'</p>
            <div class="shw-component-copy-button-demo-flex-container">
              {{!-- prettier-ignore --}}
              <pre class="shw-component-copy-button-code-block"><code
              id="test-modal-code-block-editable"
              contenteditable="true"
            >&lt;h1&gt;Lorem&lt;/h1&gt;
&lt;p&gt;Ipsum dolor&lt;/p&gt;</code></pre>
              <HdsCopyButton
                @isIconOnly={{true}}
                @text="Copy the code block content"
                @targetToCopy="#test-modal-code-block-editable"
              />
            </div>
          </form>
        </M.Body>
        <M.Footer as |F|>
          <HdsButtonSet>
            <HdsButton
              type="submit"
              @text="OK"
              {{on "click" this.closeModal}}
            />
            <HdsButton
              type="button"
              @text="Cancel"
              @color="secondary"
              {{on "click" F.close}}
            />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    {{/if}}
  </template>
}
