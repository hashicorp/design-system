import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppFooter } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAppFooter as |AF|>
    <AF.ExtraBefore>
      <DocPlaceholder
        @text="Extra Content Before"
        @height="2em"
        @width="fit-content"
        class="doc-app-footer-demo-placeholder"
      />
    </AF.ExtraBefore>
    <AF.LegalLinks />
    <AF.ExtraAfter>
      <DocPlaceholder
        @text="Extra Content After"
        @height="2em"
        @width="fit-content"
        class="doc-app-footer-demo-placeholder"
      />
    </AF.ExtraAfter>
  </HdsAppFooter>
</template>;

export default LocalComponent;
