import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

const PageLayoutsAppFrameFramelessDemoFullAppFrameWithModal: TemplateOnlyComponent =
  <template>
    {{pageTitle "AppFrame Component - Frameless"}}

    <HdsAppFrame as |Frame|>
      <Frame.Header>
        <ShwPlaceholder @height="60px" @text="header" @background="#e5ffd2" />
      </Frame.Header>
      <Frame.Sidebar>
        <ShwPlaceholder
          @width="120px"
          @height="100%"
          @text="sidebar"
          @background="#e4c5f3"
        />
      </Frame.Sidebar>
      <Frame.Main>
        <ShwPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
      </Frame.Main>
      <Frame.Footer>
        <ShwPlaceholder @height="60px" @text="footer" @background="#fff8d2" />
      </Frame.Footer>
      <Frame.Modals>
        <div class="shw-layout-app-frame-fake-overlay" />
        <div class="shw-layout-app-frame-fake-modal">
          <ShwPlaceholder
            @width="100%"
            @height="100%"
            @text="modal"
            @background="#ffffffb5"
          />
        </div>
      </Frame.Modals>
    </HdsAppFrame>
  </template>;

export default PageLayoutsAppFrameFramelessDemoFullAppFrameWithModal;
