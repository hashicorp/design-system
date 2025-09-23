import Component from '@glimmer/component';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithAreaBlocksSignature {
  Args: {
    hasHeader?: boolean;
    hasSidebar?: boolean;
    hasFooter?: boolean;
    hasModal?: boolean;
  };
  Blocks: {
    modal: [];
  };
}

export default class CodeFragmentWithAreaBlocks extends Component<CodeFragmentWithAreaBlocksSignature> {
  hasHeader = this.args.hasHeader ?? true;
  hasSidebar = this.args.hasSidebar ?? true;
  hasFooter = this.args.hasFooter ?? true;
  hasModal = this.args.hasModal ?? false;

  <template>
    <div class="shw-layout-app-frame-wrapper">
      <HdsAppFrame as |Frame|>
        {{#if this.hasHeader}}
          <Frame.Header>
            <ShwPlaceholder
              @height="60px"
              @text="header"
              @background="#e5ffd2"
            />
          </Frame.Header>
        {{/if}}
        {{#if this.hasSidebar}}
          <Frame.Sidebar>
            <ShwPlaceholder
              @width="120px"
              @height="100%"
              @text="sidebar"
              @background="#e4c5f3"
            />
          </Frame.Sidebar>
        {{/if}}
        <Frame.Main>
          <ShwPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
        </Frame.Main>
        {{#if this.hasFooter}}
          <Frame.Footer>
            <ShwPlaceholder
              @height="60px"
              @text="footer"
              @background="#fff8d2"
            />
          </Frame.Footer>
        {{/if}}
        {{#if this.hasModal}}
          <Frame.Modals>
            {{yield to="modal"}}
          </Frame.Modals>
        {{/if}}
      </HdsAppFrame>
    </div>
  </template>
}
