import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-app-frame-mock-viewport">
    <HdsAppFrame as |Frame|>
      <Frame.Header>
        {{! your "header" content goes here, this is just a mock placeholder }}
        <DocPlaceholder @height="60px" @text="header" @background="#e5ffd2" />
      </Frame.Header>
      <Frame.Sidebar>
        {{! your "sidebar" content goes here, this is just a mock placeholder }}
        <DocPlaceholder
          @width="120px"
          @height="100%"
          @text="sidebar"
          @background="#e4c5f3"
        />
      </Frame.Sidebar>
      <Frame.Main>
        {{! your "main" content goes here, this is just a mock placeholder }}
        <DocPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
      </Frame.Main>
      <Frame.Footer>
        {{! your "footer" content goes here, this is just a mock placeholder }}
        <DocPlaceholder @height="60px" @text="footer" @background="#fff8d2" />
      </Frame.Footer>
    </HdsAppFrame>
  </div>
</template>;

export default LocalComponent;
