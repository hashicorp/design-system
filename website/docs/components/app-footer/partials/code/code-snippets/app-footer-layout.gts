import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppFooter } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAppFooter as |AF|>
    <AF.ExtraBefore>
      <div class="doc-app-footer-demo-custom-content-layout">
        <DocPlaceholder
          @text="Extra Content Before"
          @height="2em"
          @width="fit-content"
          class="doc-app-footer-demo-placeholder"
        />
      </div>
    </AF.ExtraBefore>
    <AF.LegalLinks />
    <AF.ExtraAfter>
      <div class="doc-app-footer-demo-custom-content-layout">
        <DocPlaceholder
          @text="Extra Content After"
          @height="2em"
          @width="fit-content"
          class="doc-app-footer-demo-placeholder"
        />
      </div>
    </AF.ExtraAfter>
  </HdsAppFooter>
</template>;

export default LocalComponent;
