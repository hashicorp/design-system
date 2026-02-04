import Component from '@glimmer/component';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

export default class LocalComponent extends Component {
  yourSidebarBooleanFlag = false;

  <template>
    <div class="doc-app-frame-mock-viewport">
      <HdsAppFrame as |Frame|>
        {{! conditional control of the rendering of the "sidebar" }}
        {{#if this.yourSidebarBooleanFlag}}
          <Frame.Sidebar>
            <DocPlaceholder
              @width="120px"
              @height="100%"
              @text="sidebar"
              @background="#e4c5f3"
            />
          </Frame.Sidebar>
        {{/if}}
        <Frame.Main>
          <DocPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
        </Frame.Main>
        <Frame.Footer>
          <DocPlaceholder @height="60px" @text="footer" @background="#fff8d2" />
        </Frame.Footer>
      </HdsAppFrame>
    </div>
  </template>
}
