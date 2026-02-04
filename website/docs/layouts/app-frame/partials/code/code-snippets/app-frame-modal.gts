import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-app-frame-mock-viewport">
    <HdsAppFrame as |Frame|>
      <Frame.Header>
        <DocPlaceholder @height="60px" @text="header" @background="#e5ffd2" />
      </Frame.Header>
      <Frame.Sidebar>
        <DocPlaceholder
          @width="120px"
          @height="100%"
          @text="sidebar"
          @background="#e4c5f3"
        />
      </Frame.Sidebar>
      <Frame.Main>
        <DocPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
      </Frame.Main>
      <Frame.Footer>
        <DocPlaceholder @height="60px" @text="footer" @background="#fff8d2" />
      </Frame.Footer>
      <Frame.Modals>
        {{! your "modal" content goes here, this is just a mock placeholder }}
        <div class="doc-app-frame-fake-overlay" />
        <div class="doc-app-frame-fake-modal">
          <DocPlaceholder
            @width="100%"
            @height="100%"
            @text="modal"
            @background="#ffffffb5"
          />
        </div>
      </Frame.Modals>
    </HdsAppFrame>
  </div>
</template>;

export default LocalComponent;
