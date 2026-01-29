import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-app-frame-mock-viewport">
    <HdsAppFrame @hasSidebar={{false}} as |Frame|>
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
    </HdsAppFrame>
  </div>
</template>;

export default LocalComponent;
