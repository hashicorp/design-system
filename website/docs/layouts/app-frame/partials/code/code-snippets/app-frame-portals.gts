import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-app-frame-mock-viewport">
    <HdsAppFrame as |Frame|>
      <Frame.Sidebar>
        ...
      </Frame.Sidebar>
      <Frame.Main>
        ...
      </Frame.Main>
      {{! assign an ID to the element to target it in the DOM }}
      <Frame.Modals id="app-frame-modals" data-test-modals-container />
    </HdsAppFrame>
  </div>
</template>;

export default LocalComponent;
